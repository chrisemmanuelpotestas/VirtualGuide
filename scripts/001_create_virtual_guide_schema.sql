-- Virtual Guide Database Schema
-- Tables for destinations, itineraries, and user preferences

-- Destinations table - core destination information
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  province TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('beach', 'mountain', 'cultural', 'urban', 'adventure', 'nature', 'historical')),
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  best_time_to_visit TEXT,
  average_budget_per_day DECIMAL(10, 2),
  currency TEXT DEFAULT 'PHP',
  highlights TEXT[] DEFAULT '{}',
  activities TEXT[] DEFAULT '{}',
  travel_tips TEXT[] DEFAULT '{}',
  accessibility_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accommodation options for each destination
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'resort', 'hostel', 'homestay', 'airbnb', 'glamping')),
  price_per_night DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  booking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transportation options
CREATE TABLE IF NOT EXISTS transportation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  from_location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('flight', 'bus', 'ferry', 'van', 'private_car', 'tricycle', 'jeepney')),
  estimated_cost DECIMAL(10, 2),
  duration_hours DECIMAL(5, 2),
  frequency TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends Supabase auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User saved destinations (favorites)
CREATE TABLE IF NOT EXISTS saved_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
);

-- Itineraries
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  total_budget DECIMAL(12, 2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'planned', 'completed')),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Itinerary items (days/activities)
CREATE TABLE IF NOT EXISTS itinerary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  day_number INTEGER NOT NULL,
  time_slot TEXT,
  activity_type TEXT CHECK (activity_type IN ('accommodation', 'transportation', 'activity', 'meal', 'free_time')),
  title TEXT NOT NULL,
  description TEXT,
  estimated_cost DECIMAL(10, 2) DEFAULT 0,
  duration_hours DECIMAL(4, 2),
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Destination reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  visit_date DATE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transportation ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Destinations: Public read access
CREATE POLICY "destinations_public_read" ON destinations FOR SELECT USING (true);

-- Accommodations: Public read access
CREATE POLICY "accommodations_public_read" ON accommodations FOR SELECT USING (true);

-- Transportation: Public read access
CREATE POLICY "transportation_public_read" ON transportation FOR SELECT USING (true);

-- Profiles: Users can read/write their own profile
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Saved destinations: Users manage their own
CREATE POLICY "saved_destinations_select_own" ON saved_destinations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_destinations_insert_own" ON saved_destinations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_destinations_delete_own" ON saved_destinations FOR DELETE USING (auth.uid() = user_id);

-- Itineraries: Users manage their own, public ones are readable
CREATE POLICY "itineraries_select_own_or_public" ON itineraries FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "itineraries_insert_own" ON itineraries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "itineraries_update_own" ON itineraries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "itineraries_delete_own" ON itineraries FOR DELETE USING (auth.uid() = user_id);

-- Itinerary items: Access through itinerary ownership
CREATE POLICY "itinerary_items_select" ON itinerary_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND (itineraries.user_id = auth.uid() OR itineraries.is_public = true))
);
CREATE POLICY "itinerary_items_insert" ON itinerary_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid())
);
CREATE POLICY "itinerary_items_update" ON itinerary_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid())
);
CREATE POLICY "itinerary_items_delete" ON itinerary_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid())
);

-- Reviews: Public read, users manage their own
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update_own" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete_own" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger for auto-creating profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update destination rating when reviews change
CREATE OR REPLACE FUNCTION update_destination_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE destinations
  SET 
    rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE destination_id = COALESCE(NEW.destination_id, OLD.destination_id)),
    review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = COALESCE(NEW.destination_id, OLD.destination_id))
  WHERE id = COALESCE(NEW.destination_id, OLD.destination_id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_rating_on_review ON reviews;
CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_destination_rating();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON destinations(region);
CREATE INDEX IF NOT EXISTS idx_destinations_rating ON destinations(rating DESC);
CREATE INDEX IF NOT EXISTS idx_accommodations_destination ON accommodations(destination_id);
CREATE INDEX IF NOT EXISTS idx_transportation_destination ON transportation(destination_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_user ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_items_itinerary ON itinerary_items(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_reviews_destination ON reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_user ON saved_destinations(user_id);
