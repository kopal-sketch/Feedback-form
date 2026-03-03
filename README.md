# POP Feedback — Conversational feedback collection

A friendly, chat-like feedback flow (not a form). Questions appear one by one like a messaging interface. Built with Next.js 14, Tailwind CSS, and PostgreSQL (Prisma).

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - See **[SETUP-DATABASE.md](./SETUP-DATABASE.md)** for step-by-step instructions.
   - Quick version: create a project at [supabase.com](https://supabase.com), run `supabase/schema.sql` in the SQL Editor, then add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000**.

4. **View feedback (admin)**
   Open **http://localhost:3000/admin** to see all submissions in a table.

## Flow

1. **Overall experience** — “How was your overall experience with the new POP app?” (Rating 1–5 with emoji-style buttons).
2. **Service** — “Which service would you like to give feedback on?”  
   Options: **POPshop**, **POP Card**, **POP Bills**, **POP UPI**.
3. **Dynamic follow-ups** (based on rating and service):
   - **Positive (≥4):** “What delighted you the most?” (multi-select chips) + Other (free text).
   - **Neutral (3) or Negative (≤2):** “What went wrong?” (multi-select chips) + Other (free text).
   - **Any:** “Any bugs or issues you faced?” (textarea), “Any suggestion to improve the experience?” (textarea).
4. **Custom question per service** (one of):
   - POPshop → “Was delivery time satisfactory?”
   - POP Card → “Was card activation smooth?”
   - POP Bills → “Did bill payment confirmation feel instant?”
   - POP UPI → “Was the transaction experience seamless?”
5. **Submit** — All responses are saved to PostgreSQL; user sees a friendly thank-you message.

## Database (Supabase)

The form and admin page talk to Supabase **directly from the browser** (no backend API). The `feedback` table stores: `id`, `overall_rating`, `service`, `sentiment`, `what_delighted_or_wrong`, `other_text`, `bugs_issues`, `suggestions`, `custom_question_answer`, `submitted_at`. Create it by running `supabase/schema.sql` in the Supabase SQL Editor.

## Project layout

- `app/page.tsx` — Main conversational feedback UI (chat-style).
- `app/admin/page.tsx` — Admin page: view all feedback in a table.
- `app/api/feedback/route.ts` — POST (save) and GET (list) feedback.
- `components/` — ChatBubble, RatingPicker (emoji 1–5), ChoiceChips, FreetextInput.
- `lib/forms-data.ts` — Services, sentiment options, and custom questions per service.
- `lib/supabase.ts` — Supabase client (browser).
- `supabase/schema.sql` — Table definition for `feedback` (run in Supabase SQL Editor).

## Deploy on Vercel

1. **Push to GitHub** (if needed): `git init`, add remote, `git push`.
2. Go to **[vercel.com/new](https://vercel.com/new)** → Import your `pop-feedback` repo.
3. Add **Environment Variables** in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` — from [Supabase](https://supabase.com) → your project → Settings → API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon public key (same page)
4. Click **Deploy**.

Full steps (Supabase setup + table): **[VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)** or **[DEPLOY.md](./DEPLOY.md)**.
