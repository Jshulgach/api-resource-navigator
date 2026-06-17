# Prosthetics Resource Navigator Design

Date: 2026-06-17

## Goal

Build a working fullstack web prototype for Accessible Prosthetics Initiative: a public resource navigator for people affected by limb loss, limb difference, amputation, prosthetics, rehabilitation, insurance barriers, support groups, and care navigation.

The first demo must prove the core experience:

1. A user visits the homepage.
2. They ask a question or choose a quick-start prompt.
3. The assistant responds in a warm, safe, plain-language style.
4. The response includes relevant vetted resource cards with source links.
5. Urgent medical or crisis language triggers escalation guidance.

This prototype is not a medical advice chatbot. It must never diagnose, prescribe, guarantee insurance coverage, or ask for sensitive personal identifiers.

## Recommended Approach

Use the local resource retrieval milestone first, while keeping the code structured for Supabase and pgvector.

Alternatives considered:

- Static mock only: fastest, but it would not prove chat, safety handling, retrieval, or source cards.
- Full Supabase vector RAG immediately: closest to the final architecture, but higher setup risk for the first demo.
- Local retrieval demo first: gives a usable product quickly, validates the interaction, and creates clean seams for replacing keyword matching with Supabase retrieval.

The local retrieval demo is the chosen approach.

## Architecture

The app will use:

- Next.js App Router with TypeScript.
- Tailwind CSS for the UI.
- Vercel AI SDK for chat streaming.
- Groq as the initial LLM provider through a small provider wrapper.
- Local JSON seed resources for first-pass retrieval.
- Supabase schema and seed scaffolding for later vector search.

Core directories:

```text
/app
  /api
    /chat/route.ts
    /resources/route.ts
  layout.tsx
  page.tsx
/components
  Chat.tsx
  ChatMessage.tsx
  ResourceCard.tsx
  QuickStartButtons.tsx
  SafetyNotice.tsx
  Header.tsx
  Footer.tsx
/data
  resources.json
/lib
  ai/model.ts
  prompts/resource-navigator.ts
  rag/buildContext.ts
  rag/retrieveResources.ts
  resources/seed.ts
  safety/classifyUrgency.ts
  safety/classifyIntent.ts
  supabase/schema.sql
/types
  resource.ts
```

## User Experience

The homepage will be the product, not a marketing landing page. It will include:

- A compact hero with the required title and subtitle.
- A primary chat surface.
- Quick-start chips for new limb loss, prosthetist search, insurance, support groups, veterans, financial assistance, caregivers, and custom questions.
- A clear safety and privacy notice near the chat input.
- Resource cards shown under assistant answers.
- A resource browse section with category/search filters.
- Feedback buttons and a report issue action.

Visual style will be calm, healthcare/nonprofit, mobile-first, high contrast, and keyboard accessible.

## Chat Behavior

The assistant will use the required resource navigator system prompt from the instruction file.

For each chat request:

1. Receive the message history.
2. Extract the latest user message.
3. Classify intent with lightweight rules.
4. Classify urgency with lightweight rules.
5. Retrieve local resources using keyword, tag, category, population, insurance type, and urgency-aware matching.
6. Build a source-grounded context block.
7. Stream a response from Groq via the Vercel AI SDK.
8. Return resource metadata for cards.

When no strong match exists, the assistant will say it does not have a strong matching resource in the current library and suggest broad trusted starting points.

## Safety

The urgency classifier will flag terms such as fever, spreading redness, infection, pus, drainage, wound opening, severe pain, sudden swelling, chest pain, trouble breathing, fall with injury, suicidal thoughts, self-harm, "I want to die", and "I can't go on".

Urgent medical content will trigger language recommending a clinician, urgent care, emergency services, or crisis support as appropriate. The assistant will avoid evaluating symptoms or minimizing risk.

The UI and backend will avoid collecting or storing full names, addresses, insurance IDs, medical record numbers, claim numbers, photos, exact street addresses, or detailed medical histories.

## Data Model

The first pass will use `/data/resources.json`, seeded with the national resources from the instruction file:

- National Limb Loss Resource Center
- Amputee Coalition Support Group Finder
- ABC Directory
- Medicare Prosthetic Device Coverage
- VA Prosthetic and Sensory Aids Service
- State Vocational Rehabilitation Agencies

The resource type will include title, organization, category, resource type, population, geography, state, insurance type, summary, URL, phone, tags, source priority, and last verified date.

`/lib/supabase/schema.sql` will include the requested `resources`, `resource_chunks`, `match_resource_chunks`, and `chat_feedback` definitions so the project is ready for the vector retrieval phase.

## API Design

`POST /api/chat`

- Input: message history from the chat client.
- Output: streamed assistant text and resource card metadata.
- Behavior: server-only API keys, no transcript persistence, no sensitive logging.

`GET /api/resources`

- Query filters: category, state, insurance type, population, and search query.
- Output: matching local resources for browsing.

## Error Handling

If `GROQ_API_KEY` is missing, the chat route will return a clear development error without exposing secrets.

If the model call fails, the UI will show a concise nontechnical error and preserve the user message.

If retrieval has no exact match, the assistant will fall back to broad national resources rather than inventing recommendations.

## Testing And Verification

Initial verification will include:

- TypeScript and lint checks.
- A production build.
- Manual browser checks on desktop and mobile widths.
- Chat smoke tests for general navigation, insurance, support groups, veterans, urgent symptoms, and crisis phrasing.
- API checks for `/api/resources` filters.

## Deployment

The app should deploy cleanly to Vercel. Required server-side environment variables:

```text
GROQ_API_KEY=
GROQ_MODEL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
EMBEDDING_API_KEY=
EMBEDDING_MODEL=
```

For the first local retrieval demo, `GROQ_API_KEY` is the only required key for live chat. Supabase and embedding keys are reserved for the later vector retrieval phase.

## Out Of Scope For First Demo

- Admin resource editor.
- Persistent chat transcript storage.
- Production analytics.
- Full pgvector retrieval as the primary retrieval path.
- Authentication.
- Location-specific provider matching beyond simple filters.
