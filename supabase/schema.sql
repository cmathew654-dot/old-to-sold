-- Old to Sold Database Schema
-- Run this in Supabase → SQL Editor → New Query → Paste & Run

-- Catalog items (public read)
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  brand text,
  category text,
  condition text check (condition in ('A','B','C')),
  price_list numeric(10,2),
  status text default 'available' check (status in ('available','sold','hold','draft')),
  thumbnail_url text,
  ebay_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Consignment submissions (private)
create table if not exists consignments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  payload jsonb not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table items enable row level security;
alter table consignments enable row level security;

-- Public can read only non-draft items
create policy "public read items"
on items for select to anon
using (status in ('available','sold','hold'));

-- Only authenticated users can manage items (for future admin use)
create policy "authenticated manage items"
on items for all to authenticated
using (true);

-- Only service role can access consignments (server-side only)
create policy "service role access consignments"
on consignments for all to service_role
using (true);

-- Create indexes for better performance
create index if not exists items_status_idx on items(status);
create index if not exists items_featured_idx on items(featured);
create index if not exists items_created_at_idx on items(created_at desc);
create index if not exists consignments_created_at_idx on consignments(created_at desc);
