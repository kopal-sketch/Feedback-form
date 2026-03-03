# Deploy POP Feedback with Vercel + Supabase

This guide walks you through deploying the app on **Vercel** (frontend + API) and **Supabase** (PostgreSQL database).

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Choose your organization, name the project (e.g. `pop-feedback`), set a database password, and pick a region close to your users.
4. Wait for the project to be ready.

---

## 2. Get your project URL and anon key

1. In the Supabase dashboard, open your project.
2. Go to **Project Settings** (gear icon) → **API** (under “Configuration”).
3. Copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (under “Project API keys”).

The app connects to Supabase **directly from the browser** (no backend), so you only need these two values.

---

## 3. Create the database table in Supabase

1. In Supabase, go to **SQL Editor**.
2. Click **New query** and paste the contents of `supabase/schema.sql`, then run it.

---

## 4. Deploy on Vercel

1. Push your code to **GitHub** (if you haven’t already).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New…** → **Project** and import your repository.
4. Leave **Framework Preset** as **Next.js** and **Root Directory** as `.` (or your app root).
5. Under **Environment Variables**, add:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL` → **Value:** your Project URL from step 2.
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Value:** your anon key from step 2.
   - Apply to **Production**, **Preview**, and **Development** if you use them.
6. Click **Deploy**.

---

## 5. After deployment

- **App URL:** `https://your-project.vercel.app`
- **Feedback form:** `https://your-project.vercel.app`
- **Admin (view feedback):** `https://your-project.vercel.app/admin`

Confirm that submitting feedback on the form saves a row in Supabase (**Table Editor** → `feedback`) and that the admin page loads and shows data.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| Form submit does nothing or errors | Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local` (and on Vercel). Restart the dev server after changing env vars. |
| Table doesn’t exist | Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor. |
| Admin page empty | Confirm rows exist in Supabase **Table Editor** → `feedback`. RLS must allow **select** (the default policy in `schema.sql` does). |
| CORS or network errors | The Supabase anon key is meant for browser use; no extra CORS setup is needed if you use the official Supabase URL. |
