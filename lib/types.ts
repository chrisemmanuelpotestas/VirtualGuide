export interface Destination {
  id: string
  name: string
  region: string
  province: string
  description: string
  long_description: string | null
  image_url: string
  gallery_urls: string[]
  category: 'beach' | 'mountain' | 'cultural' | 'urban' | 'adventure' | 'nature' | 'historical'
  rating: number
  review_count: number
  latitude: number | null
  longitude: number | null
  best_time_to_visit: string | null
  average_budget_per_day: number | null
  currency: string
  highlights: string[]
  activities: string[]
  travel_tips: string[]
  accessibility_info: string | null
  created_at: string
  updated_at: string
}

export interface Accommodation {
  id: string
  destination_id: string
  name: string
  type: 'hotel' | 'resort' | 'hostel' | 'homestay' | 'airbnb' | 'glamping'
  price_per_night: number
  rating: number
  amenities: string[]
  image_url: string | null
  booking_url: string | null
  created_at: string
}

export interface Transportation {
  id: string
  destination_id: string
  from_location: string
  type: 'flight' | 'bus' | 'ferry' | 'van' | 'private_car' | 'tricycle' | 'jeepney'
  estimated_cost: number | null
  duration_hours: number | null
  frequency: string | null
  notes: string | null
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface SavedDestination {
  id: string
  user_id: string
  destination_id: string
  notes: string | null
  created_at: string
  destination?: Destination
}

export interface Itinerary {
  id: string
  user_id: string
  title: string
  description: string | null
  start_date: string | null
  end_date: string | null
  total_budget: number | null
  status: 'draft' | 'planned' | 'completed'
  is_public: boolean
  created_at: string
  updated_at: string
  items?: ItineraryItem[]
}

export interface ItineraryItem {
  id: string
  itinerary_id: string
  destination_id: string | null
  day_number: number
  time_slot: string | null
  activity_type: 'accommodation' | 'transportation' | 'activity' | 'meal' | 'free_time' | null
  title: string
  description: string | null
  estimated_cost: number
  duration_hours: number | null
  notes: string | null
  order_index: number
  created_at: string
  destination?: Destination
}

export interface Review {
  id: string
  user_id: string
  destination_id: string
  rating: number
  title: string | null
  content: string | null
  visit_date: string | null
  helpful_count: number
  created_at: string
  updated_at: string
}

export type CategoryType = Destination['category']

export const CATEGORIES: { value: CategoryType; label: string; icon: string }[] = [
  { value: 'beach', label: 'Beach', icon: '🏖️' },
  { value: 'mountain', label: 'Mountain', icon: '⛰️' },
  { value: 'cultural', label: 'Cultural', icon: '🏛️' },
  { value: 'urban', label: 'Urban', icon: '🏙️' },
  { value: 'adventure', label: 'Adventure', icon: '🧗' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'historical', label: 'Historical', icon: '🏰' },
]

export const REGIONS = [
  'Western Visayas',
  'Mimaropa',
  'Central Visayas',
  'Caraga',
  'Cordillera',
  'Ilocos',
  'Cagayan Valley',
  'Davao',
]
