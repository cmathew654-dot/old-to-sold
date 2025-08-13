"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Copy, Check, ExternalLink, AlertCircle } from "lucide-react"

const SCHEMA_SQL = `-- Old to Sold Database Schema
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
create index if not exists consignments_created_at_idx on consignments(created_at desc);`

export function DatabaseSetup() {
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const copySchema = async () => {
    try {
      await navigator.clipboard.writeText(SCHEMA_SQL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Database Setup Required
          </CardTitle>
          <CardDescription>
            Run this SQL schema in your Supabase project to create the required tables and security policies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> This SQL includes Row Level Security (RLS) policies that are required for
              proper data protection. Public users can only read non-draft items, while consignment submissions are
              server-side only.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Database Schema</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copySchema} className="bg-transparent">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy SQL"}
                </Button>
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Supabase
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-neutral-100 rounded-lg p-4">
              <pre className="text-xs bg-white p-4 rounded border overflow-x-auto max-h-96">{SCHEMA_SQL}</pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Step-by-Step Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
              <li>
                Open your{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Supabase Dashboard
                </a>
              </li>
              <li>Navigate to your Old to Sold project</li>
              <li>Go to "SQL Editor" in the left sidebar</li>
              <li>Click "New Query" to create a new SQL query</li>
              <li>Copy the SQL above and paste it into the editor</li>
              <li>Click "Run" to execute the schema</li>
              <li>Verify the tables were created in "Table Editor"</li>
            </ol>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>What this creates:</strong>
              <br />• <code>items</code> table for catalog products (public read access)
              <br />• <code>consignments</code> table for form submissions (server-only access)
              <br />• Row Level Security policies for data protection
              <br />• Performance indexes for faster queries
            </AlertDescription>
          </Alert>

          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={() => setConfirmed(true)}
              disabled={confirmed}
              className={confirmed ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {confirmed ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Schema Confirmed
                </>
              ) : (
                "I've Run the SQL Schema"
              )}
            </Button>
            {confirmed && (
              <Button variant="outline" asChild className="bg-transparent">
                <a href="/setup">Continue Setup</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {confirmed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Database Ready!
            </CardTitle>
            <CardDescription>Your database schema is now configured. Next steps:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Test Your Setup:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Add a test item in Table Editor</li>
                  <li>• Check it appears in your catalog</li>
                  <li>• Submit the sell form</li>
                  <li>• Verify data in consignments table</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Security Features:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Public can only read available items</li>
                  <li>• Draft items are hidden from public</li>
                  <li>• Consignments are server-side only</li>
                  <li>• RLS protects all sensitive data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
