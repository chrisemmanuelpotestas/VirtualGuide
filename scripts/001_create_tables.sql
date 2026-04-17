-- Create destinations table
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
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  best_time_to_visit TEXT,
  average_budget_per_day DECIMAL(10,2),
  currency TEXT DEFAULT 'PHP',
  highlights TEXT[] DEFAULT '{}',
  activities TEXT[] DEFAULT '{}',
  travel_tips TEXT[] DEFAULT '{}',
  accessibility_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'resort', 'hostel', 'homestay', 'airbnb', 'glamping')),
  price_per_night DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  booking_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transportation table
CREATE TABLE IF NOT EXISTS transportation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  from_location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('flight', 'bus', 'ferry', 'van', 'private_car', 'tricycle', 'jeepney')),
  estimated_cost DECIMAL(10,2),
  duration_hours DECIMAL(5,2),
  frequency TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_destinations table
CREATE TABLE IF NOT EXISTS saved_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
);

-- Create itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  total_budget DECIMAL(12,2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'planned', 'completed')),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create itinerary_items table
CREATE TABLE IF NOT EXISTS itinerary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  day_number INTEGER NOT NULL,
  time_slot TEXT,
  activity_type TEXT CHECK (activity_type IN ('accommodation', 'transportation', 'activity', 'meal', 'free_time')),
  title TEXT NOT NULL,
  description TEXT,
  estimated_cost DECIMAL(10,2) DEFAULT 0,
  duration_hours DECIMAL(5,2),
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  visit_date DATE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Destinations - public read access
CREATE POLICY "destinations_select_all" ON destinations FOR SELECT USING (true);

-- Accommodations - public read access
CREATE POLICY "accommodations_select_all" ON accommodations FOR SELECT USING (true);

-- Transportation - public read access
CREATE POLICY "transportation_select_all" ON transportation FOR SELECT USING (true);

-- Saved destinations RLS policies
CREATE POLICY "saved_destinations_select_own" ON saved_destinations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_destinations_insert_own" ON saved_destinations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_destinations_delete_own" ON saved_destinations FOR DELETE USING (auth.uid() = user_id);

-- Itineraries RLS policies
CREATE POLICY "itineraries_select_own" ON itineraries FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "itineraries_insert_own" ON itineraries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "itineraries_update_own" ON itineraries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "itineraries_delete_own" ON itineraries FOR DELETE USING (auth.uid() = user_id);

-- Itinerary items RLS policies (via itinerary ownership)
CREATE POLICY "itinerary_items_select" ON itinerary_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND (itineraries.user_id = auth.uid() OR itineraries.is_public = true)));
CREATE POLICY "itinerary_items_insert" ON itinerary_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid()));
CREATE POLICY "itinerary_items_update" ON itinerary_items FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid()));
CREATE POLICY "itinerary_items_delete" ON itinerary_items FOR DELETE 
  USING (EXISTS (SELECT 1 FROM itineraries WHERE itineraries.id = itinerary_items.itinerary_id AND itineraries.user_id = auth.uid()));

-- Reviews RLS policies
CREATE POLICY "reviews_select_all" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update_own" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete_own" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_destinations_updated_at ON destinations;
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_itineraries_updated_at ON itineraries;
CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON itineraries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
