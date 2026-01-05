# 🔧 Configuration Setup Guide

## ❌ Current Issues Identified

1. **Supabase Project No Longer Exists**: The URL `oybjnhtyogxiwvsldxhj.supabase.co` is not resolvable
2. **Missing Environment Variables**: EmailJS configuration is incomplete

## 🛠️ Step-by-Step Fix Instructions

### Step 1: Create/Setup Supabase Project

#### Option A: Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Create a new project
4. Once created, go to **Settings** > **API**
5. Copy the following values:
   - **Project URL** (e.g., `https://abc123def456.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiI...`)

#### Option B: Use Existing Project
If you have an existing Supabase project, get your credentials from the project settings.

### Step 2: Update Configuration Files

After getting your Supabase credentials, update the following files:

#### File: `config/env.js` (Lines 10-11)
```javascript
// Replace these lines:
window.SUPABASE_URL = window.SUPABASE_URL || 'https://your-project-id.supabase.co';
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'your-anon-key-here';

// With your actual values:
window.SUPABASE_URL = window.SUPABASE_URL || 'https://YOUR_ACTUAL_PROJECT_ID.supabase.co';
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_ACTUAL_ANON_KEY';
```

#### File: `config/config.js` (Lines 27-28)
```javascript
// Replace these lines:
const url = window.AppConfig.getEnv('SUPABASE_URL') || 'https://your-project-id.supabase.co';
const key = window.AppConfig.getEnv('SUPABASE_ANON_KEY') || 'your-anon-key-here';

// With your actual values:
const url = window.AppConfig.getEnv('SUPABASE_URL') || 'https://YOUR_ACTUAL_PROJECT_ID.supabase.co';
const key = window.AppConfig.getEnv('SUPABASE_ANON_KEY') || 'YOUR_ACTUAL_ANON_KEY';
```

### Step 3: Setup Database Tables

If using a new Supabase project, you'll need to create the required tables. Use the following SQL:

```sql
-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create schedule_overrides table
CREATE TABLE IF NOT EXISTS public.schedule_overrides (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    is_closed BOOLEAN DEFAULT FALSE,
    special_hours_start TIME,
    special_hours_end TIME,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_overrides ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON public.reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read access" ON public.admin_users FOR SELECT USING (true);
CREATE POLICY "Allow admin operations" ON public.schedule_overrides FOR ALL USING (true);
```

### Step 4: Verify EmailJS Configuration

The EmailJS configuration has been updated to use the correct values from `.env.example`:
- ✅ `EMAILJS_PUBLIC_KEY`: `KyHtLCaZ6C6XEpcv0`
- ✅ `EMAILJS_SERVICE_ID`: `service_ppi835a`  
- ✅ `EMAILJS_TEMPLATE_ID`: `template_jcdlzq6`

If these don't work, check your EmailJS account for the correct values.

### Step 5: For Production Deployment

When deploying to Netlify/Vercel, set these environment variables in your hosting platform:

```
SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=YOUR_ACTUAL_ANON_KEY
EMAILJS_PUBLIC_KEY=KyHtLCaZ6C6XEpcv0
EMAILJS_SERVICE_ID=service_ppi835a
EMAILJS_TEMPLATE_ID=template_jcdlzq6
```

## 🧪 Testing After Configuration

1. Open the application in your browser
2. Check browser console - you should see:
   - ✅ "Supabase設定読み込み成功"
   - ✅ "Supabaseクライアント作成成功"
   - ✅ "Supabase接続テスト成功"
3. No more `ERR_NAME_NOT_RESOLVED` errors

## 📞 Next Steps

1. **Immediate**: Update Supabase credentials as outlined above
2. **Verify**: Test the application locally
3. **Deploy**: Update environment variables in production
4. **Backup**: Document your new Supabase project details securely

---
**Note**: Keep your Supabase credentials secure and never commit them to public repositories.