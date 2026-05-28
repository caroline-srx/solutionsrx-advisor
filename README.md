# SolutionsRx® Supplement Advisor

A pharmacist-formulated supplement recommendation tool built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Users answer a short health quiz and receive personalized supplement recommendations with dosage guidance and direct product links.

---

## Project Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (brand colors: Red `#bf0a30`, Navy `#002868`)
- **Database**: Supabase (PostgreSQL) — stores survey responses
- **Deployment target**: Vercel

### Key features
- 9-question adaptive quiz (one question is conditionally shown based on prior answers)
- Rule-based recommendation engine with correct priority ordering
- Mobile-first, touch-friendly UI with large tap targets
- Fire-and-forget Supabase logging (results always show even if DB is unavailable)
- FDA and medical disclaimers on results screen

---

## Local Development Setup

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Steps

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd solutionsrx-advisor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and fill in your Supabase credentials:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   > **Note**: If you skip this step, the app still works — survey submissions are silently skipped when Supabase vars are absent.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Setup

### 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**.
3. Choose an organization, name your project (e.g., `solutionsrx-advisor`), set a strong database password, and select a region close to your users.
4. Click **Create new project** and wait ~2 minutes for provisioning.

### 2. Create the `survey_responses` table

In the Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Create the survey_responses table
CREATE TABLE IF NOT EXISTS public.survey_responses (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now() NOT NULL,
  answers     jsonb NOT NULL,
  recommendations jsonb NOT NULL
);

-- Optional: Enable Row Level Security (recommended for production)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow the anon key to insert (the app uses the anon key to write responses)
CREATE POLICY "Allow anonymous inserts"
  ON public.survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Restrict reads to authenticated users / service role only
-- (prevents public from reading other users' survey data)
CREATE POLICY "Restrict reads"
  ON public.survey_responses
  FOR SELECT
  TO authenticated
  USING (true);
```

### 3. Get your API keys

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** (e.g., `https://abcdefghij.supabase.co`).
3. Copy the **anon public** key.
4. Paste both into your `.env.local` file (and into Vercel env vars — see below).

---

## Vercel Deployment

### 1. Push to GitHub

Create a new GitHub repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/solutionsrx-advisor.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in (or create an account).
2. Click **Add New → Project**.
3. Select **Import Git Repository** and choose your `solutionsrx-advisor` repo.
4. Vercel will auto-detect Next.js — leave all build settings at defaults.

### 3. Set Environment Variables in Vercel

Before deploying, add your Supabase environment variables:

1. In the Vercel project setup screen, expand **Environment Variables**.
2. Add the following two variables:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key-here` |

3. Make sure both are checked for **Production**, **Preview**, and **Development** environments.

### 4. Deploy

Click **Deploy**. Vercel will build and deploy your app. You'll receive a `.vercel.app` URL (e.g., `https://solutionsrx-advisor.vercel.app`).

### 5. Subsequent deploys

Every push to the `main` branch automatically triggers a new production deployment.

---

## Custom Domain: demo.solutionsrx.com

### Step 1: Add the domain in Vercel

1. In your Vercel project dashboard, go to **Settings → Domains**.
2. Click **Add Domain** and enter `demo.solutionsrx.com`.
3. Vercel will show you a DNS record to add — it will be a **CNAME** pointing to `cname.vercel-dns.com`.

### Step 2: Add the CNAME record in your DNS provider

Log in to wherever `solutionsrx.com` DNS is managed (e.g., GoDaddy, Cloudflare, Route 53, Namecheap) and add:

| Type | Name / Host | Value / Target | TTL |
|------|-------------|----------------|-----|
| CNAME | `demo` | `cname.vercel-dns.com` | 3600 (or Auto) |

> **Cloudflare note**: If using Cloudflare, set the proxy status to **DNS only** (gray cloud) initially so Vercel can issue an SSL certificate. You can enable the proxy later if desired.

### Step 3: Wait for propagation

DNS changes typically propagate within 5–30 minutes. Once Vercel detects the CNAME it will automatically provision a free SSL certificate via Let's Encrypt.

### Step 4: Verify

Visit `https://demo.solutionsrx.com` — you should see the Supplement Advisor app served over HTTPS.

---

## SQL Reference

### Create `survey_responses` table (full script)

```sql
CREATE TABLE IF NOT EXISTS public.survey_responses (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now() NOT NULL,
  answers         jsonb       NOT NULL,
  recommendations jsonb       NOT NULL
);

-- Row Level Security
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.survey_responses FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Restrict reads to authenticated users"
  ON public.survey_responses FOR SELECT TO authenticated
  USING (true);
```

### Example row shape

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T14:30:00Z",
  "answers": {
    "q1": "Yes",
    "q2": "No",
    "q4": "Yes",
    "q5": "No",
    "q6": "Yes",
    "q7": "No",
    "q8": "Yes",
    "q9": "No"
  },
  "recommendations": [
    {
      "product_id": "rx_multi",
      "product_name": "Prescription Support Multivitamin",
      "reason": "You take prescription medications...",
      "priority_tag": "Top Priority"
    }
  ]
}
```

### Query to view responses (run in Supabase SQL Editor)

```sql
SELECT
  id,
  created_at,
  answers,
  jsonb_array_length(recommendations) AS num_recommendations,
  recommendations
FROM public.survey_responses
ORDER BY created_at DESC
LIMIT 50;
```

---

## Project Structure

```
solutionsrx-advisor/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.ts        # POST endpoint — saves to Supabase
│   ├── globals.css             # Tailwind directives + global styles
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Entry page — renders SurveyApp
├── components/
│   ├── Header.tsx              # Brand header
│   ├── ProgressBar.tsx         # Quiz progress bar
│   ├── QuestionCard.tsx        # Individual question with answer buttons
│   ├── ResultsCard.tsx         # Recommendations display + disclaimers
│   └── SurveyApp.tsx           # Main orchestrator component
├── lib/
│   ├── quiz-logic.ts           # Questions, products, recommendation engine
│   ├── supabase.ts             # Client-side Supabase client
│   └── supabase-server.ts      # Server-side Supabase client
├── .env.local.example          # Environment variable template
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## License

&copy; SolutionsRx®. All rights reserved.
