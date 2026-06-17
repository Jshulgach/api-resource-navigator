# Deploying To Vercel

This Next.js app can be deployed directly to Vercel.

## Required Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```text
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
```

The prototype uses local JSON resources for retrieval, so Supabase is not required for the first hosted demo.

Reserve these for the later Supabase/pgvector phase:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
EMBEDDING_API_KEY=
EMBEDDING_MODEL=
```

Optional public labels:

```text
NEXT_PUBLIC_APP_NAME=Prosthetics Resource Navigator
NEXT_PUBLIC_NONPROFIT_NAME=Accessible Prosthetics Initiative
```

## Deploy With The Vercel CLI

From the project root:

```bash
npx vercel
```

Follow the prompts to link the project to your Vercel account. For the production URL:

```bash
npx vercel --prod
```

## Deploy From Git

1. Push this branch to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the repository.
4. Keep the default Next.js build settings.
5. Add the required environment variables.
6. Deploy.

## Preflight Checks

Run these before deploying:

```bash
npm test
npm run lint
npm run build
```

