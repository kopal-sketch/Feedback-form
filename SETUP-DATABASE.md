# How to set up the database

The form and admin page connect **directly to Supabase** from the browser (no backend API). You only need a Supabase project and the table.

---

## Supabase setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**.
3. Fill in:
   - **Name:** e.g. `pop-feedback`
   - **Database password:** choose a strong password and **save it**.
   - **Region:** pick one close to you.
4. Click **Create new project** and wait until it’s ready.

### 2. Get your project URL and anon key

1. In the project dashboard, open **Project Settings** (gear icon in the sidebar).
2. Go to **API** (under “Configuration”).
3. Copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (under “Project API keys”).

### 3. Create the `feedback` table

1. In Supabase, go to **SQL Editor**.
2. Click **New query**.
3. Open the file `supabase/schema.sql` in this repo, copy its contents, paste into the editor, and click **Run**.

### 4. Connect the app

1. Create a file `.env.local` in the project root (same folder as `package.json`).
2. Add (use your real URL and anon key from step 2):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart the dev server if it’s already running:

```bash
npm run dev
```

The feedback form and admin page will now read/write to Supabase directly from the browser.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Create a project at [supabase.com](https://supabase.com), set a database password |
| 2 | In **Settings → API**, copy **Project URL** and **anon public** key |
| 3 | In **SQL Editor**, run the contents of `supabase/schema.sql` to create the `feedback` table |
| 4 | In the project root, create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| 5 | Run `npm run dev` |

Never commit `.env.local` (it’s in `.gitignore`). For Vercel, add the same two env vars in the project’s Environment Variables.
