-- ==================================================
-- AstroLive Vahan — Database Schema Migration
-- Phase 2 Initial Schema for Supabase PostgreSQL
-- ==================================================

-- 1. Users Table (Anonymous users permitted, user_id optional)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Birth Profiles Table
CREATE TABLE IF NOT EXISTS birth_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    birth_time TIME NOT NULL,
    birth_city TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    timezone TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Vahan Requests Table
CREATE TABLE IF NOT EXISTS vahan_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    birth_profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
    vehicle_type TEXT NOT NULL,
    vehicle_model TEXT NOT NULL,
    delivery_start DATE NOT NULL,
    delivery_end DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'accepted',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Vahan Reports Table (For Phase 3+ astrology calculations)
CREATE TABLE IF NOT EXISTS vahan_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES vahan_requests(id) ON DELETE CASCADE,
    shubh_window JSONB,
    lucky_numbers JSONB,
    colours JSONB,
    direction JSONB,
    report_payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_birth_profiles_user_id ON birth_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_vahan_requests_birth_profile ON vahan_requests(birth_profile_id);
CREATE INDEX IF NOT EXISTS idx_vahan_reports_request ON vahan_reports(request_id);
