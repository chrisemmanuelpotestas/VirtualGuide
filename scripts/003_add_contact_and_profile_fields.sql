-- Migration: Add contact submissions table and extend profiles
-- Run this after the initial schema has been created

-- Add additional profile fields
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS school TEXT DEFAULT 'First City Providential College',
ADD COLUMN IF NOT EXISTS course TEXT DEFAULT 'BS Tourism Management',
ADD COLUMN IF NOT EXISTS year_level TEXT;

-- Contact submissions table for storing contact form messages
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('general', 'support', 'bug', 'suggestion')),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for the contact form)
CREATE POLICY "contact_submissions_insert_all" ON contact_submissions 
FOR INSERT WITH CHECK (true);

-- Only admins can read/update (we'll use service role key for admin access)
-- For now, no select policy means regular users can't read submissions

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, school, course)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'school', 'First City Providential College'),
    COALESCE(NEW.raw_user_meta_data ->> 'course', 'BS Tourism Management')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
