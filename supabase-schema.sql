
-- Run this in Supabase SQL Editor before deploying the Netlify site.
create extension if not exists pgcrypto;

create table if not exists public.gtv_support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text unique not null,
  name text not null,
  email text not null,
  device text not null,
  category text not null,
  subject text not null,
  message text not null,
  status text not null default 'open' check (status in ('open','in_progress','waiting_customer','resolved','closed')),
  admin_reply text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gtv_service_status (
  id integer primary key default 1 check (id = 1),
  overall_status text not null default 'operational' check (overall_status in ('operational','degraded','outage','maintenance')),
  public_message text not null default 'No additional service notices at this time.',
  updated_at timestamptz not null default now()
);
insert into public.gtv_service_status (id) values (1) on conflict (id) do nothing;

alter table public.gtv_support_tickets enable row level security;
alter table public.gtv_service_status enable row level security;
-- No anon/authenticated table policies are created intentionally.
-- Netlify Functions use the Supabase service-role key stored only as a server environment variable.


-- Customer feedback submitted through the website.
create table if not exists public.gtv_customer_feedback (
  id uuid primary key default gen_random_uuid(),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 3 and 1200),
  created_at timestamptz not null default now()
);
alter table public.gtv_customer_feedback enable row level security;
-- No public read/write policies. Netlify Function inserts using the server-only service-role key.
