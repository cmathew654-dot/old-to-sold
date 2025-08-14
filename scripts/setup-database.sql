-- Old to Sold Database Setup Script
-- Run this in Supabase SQL Editor to create all necessary tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create items table for catalog (public read access)
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  condition TEXT CHECK (condition IN ('A','B','C')),
  price_list NUMERIC(10,2),
  status TEXT DEFAULT 'available' CHECK (status IN ('available','sold','hold','draft')),
  thumbnail_url TEXT,
  ebay_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create consignments table for form submissions (private access)
CREATE TABLE IF NOT EXISTS consignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','contacted','completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE consignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for items table
-- Public can read only non-draft items
DROP POLICY IF EXISTS "public_read_items" ON items;
CREATE POLICY "public_read_items" ON items
  FOR SELECT TO anon
  USING (status IN ('available','sold','hold'));

-- Authenticated users can manage items (for admin use)
DROP POLICY IF EXISTS "authenticated_manage_items" ON items;
CREATE POLICY "authenticated_manage_items" ON items
  FOR ALL TO authenticated
  USING (true);

-- RLS Policies for consignments table
-- Only service role can access consignments (server-side only)
DROP POLICY IF EXISTS "service_role_access_consignments" ON consignments;
CREATE POLICY "service_role_access_consignments" ON consignments
  FOR ALL TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS items_status_idx ON items(status);
CREATE INDEX IF NOT EXISTS items_featured_idx ON items(featured);
CREATE INDEX IF NOT EXISTS items_category_idx ON items(category);
CREATE INDEX IF NOT EXISTS items_created_at_idx ON items(created_at DESC);
CREATE INDEX IF NOT EXISTS items_slug_idx ON items(slug);

CREATE INDEX IF NOT EXISTS consignments_status_idx ON consignments(status);
CREATE INDEX IF NOT EXISTS consignments_email_idx ON consignments(email);
CREATE INDEX IF NOT EXISTS consignments_created_at_idx ON consignments(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_items_updated_at ON items;
CREATE TRIGGER update_items_updated_at
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consignments_updated_at ON consignments;
CREATE TRIGGER update_consignments_updated_at
    BEFORE UPDATE ON consignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample catalog items (optional)
INSERT INTO items (slug, title, brand, category, condition, price_list, status, featured, thumbnail_url, ebay_url) VALUES
('vintage-leather-jacket-001', 'Vintage Brown Leather Jacket', 'Wilson Leather', 'Clothing & Accessories', 'A', 89.99, 'available', true, '/vintage-leather-jacket.png', 'https://www.ebay.com/itm/example1'),
('luxury-quilted-handbag-002', 'Designer Quilted Handbag', 'Coach', 'Clothing & Accessories', 'B', 245.00, 'available', true, '/luxury-quilted-handbag.png', 'https://www.ebay.com/itm/example2'),
('antique-wooden-chair-003', 'Antique Oak Dining Chair', 'Unknown', 'Home & Garden', 'B', 125.00, 'available', false, '/antique-wooden-chair.png', 'https://www.ebay.com/itm/example3')
ON CONFLICT (slug) DO NOTHING;

-- Verify tables were created
SELECT 
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('items', 'consignments');

-- Show table structures
\d items;
\d consignments;
