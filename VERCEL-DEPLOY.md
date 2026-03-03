# Deploy to Vercel (quick steps)

## 1. Push code to GitHub

If the project isn’t on GitHub yet:

```bash
cd /Users/kopal/pop-feedback
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pop-feedback.git
git push -u origin main
```

(Replace `YOUR_USERNAME` and repo name with your GitHub repo URL.)

## 2. Deploy on Vercel

1. Open **[vercel.com/new](https://vercel.com/new)** and sign in (GitHub is easiest).
2. Click **Import** next to your `pop-feedback` repository (or paste the repo URL).
3. **Framework Preset:** Next.js (auto-detected).  
   **Root Directory:** leave as `.`
4. Under **Environment Variables**, add:

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (from [Supabase](https://supabase.com) → Project → Settings → API) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key (same page) |

   Enable these for **Production**, **Preview**, and **Development** if you use them.

5. Click **Deploy**.

## 3. After deploy

- **App:** `https://your-project.vercel.app`
- **Admin:** `https://your-project.vercel.app/admin`

Make sure the Supabase `feedback` table exists (run `supabase/schema.sql` in the Supabase SQL Editor if you haven’t already).

---

**Later:** To redeploy, push to `main` (or your production branch). Vercel will build and deploy automatically.
