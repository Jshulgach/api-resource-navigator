# Prosthetics Resource Navigator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working Next.js prototype for a prosthetics and limb-loss resource navigator with streaming chat, local resource retrieval, safety handling, resource browsing, and Supabase-ready schema.

**Architecture:** Create a fresh Next.js App Router project in the current repo. Use local JSON resources and rule-based retrieval for the first demo, while isolating model, safety, and RAG helpers so Supabase vector retrieval can replace local matching later.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vercel AI SDK, Groq provider, Vitest for unit tests.

---

## File Structure

- Create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.env.example`.
- Create app shell files: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`.
- Create API routes: `app/api/chat/route.ts`, `app/api/resources/route.ts`.
- Create components: `components/Chat.tsx`, `components/ChatMessage.tsx`, `components/ResourceCard.tsx`, `components/QuickStartButtons.tsx`, `components/SafetyNotice.tsx`, `components/Header.tsx`, `components/Footer.tsx`, `components/ResourceBrowser.tsx`.
- Create domain modules: `types/resource.ts`, `data/resources.json`, `lib/resources/seed.ts`, `lib/safety/classifyUrgency.ts`, `lib/safety/classifyIntent.ts`, `lib/rag/retrieveResources.ts`, `lib/rag/buildContext.ts`, `lib/prompts/resource-navigator.ts`, `lib/ai/model.ts`, `lib/supabase/schema.sql`.
- Create tests: `lib/safety/classifyUrgency.test.ts`, `lib/safety/classifyIntent.test.ts`, `lib/rag/retrieveResources.test.ts`.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Create the Next.js project configuration**

Define scripts for `dev`, `build`, `start`, `lint`, and `test`. Add dependencies for Next.js, React, Vercel AI SDK, Groq provider, Tailwind, TypeScript, ESLint, and Vitest.

- [ ] **Step 2: Create the root layout and global styles**

Set the app metadata, import `app/globals.css`, and define accessible base styles with Tailwind layers.

- [ ] **Step 3: Run dependency installation**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 4: Commit scaffold**

Run: `git add . && git commit -m "chore: scaffold next app"`

---

### Task 2: Resource Data, Types, Safety, And Retrieval

**Files:**
- Create: `types/resource.ts`
- Create: `data/resources.json`
- Create: `lib/resources/seed.ts`
- Create: `lib/safety/classifyUrgency.ts`
- Create: `lib/safety/classifyIntent.ts`
- Create: `lib/rag/retrieveResources.ts`
- Create: `lib/rag/buildContext.ts`
- Create: `lib/safety/classifyUrgency.test.ts`
- Create: `lib/safety/classifyIntent.test.ts`
- Create: `lib/rag/retrieveResources.test.ts`

- [ ] **Step 1: Write failing safety and retrieval tests**

Test urgent medical terms, crisis terms, insurance intent, veteran intent, support-group intent, and resource retrieval for Medicare, veterans, prosthetist, and support group queries.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: tests fail because modules do not exist yet.

- [ ] **Step 3: Implement types and seed resources**

Create the `Resource`, `ResourceWithScore`, `IntentCategory`, and `UrgencyClassification` types and seed at least the six national resources from the design spec.

- [ ] **Step 4: Implement classifiers and retrieval**

Use lightweight keyword rules for intent and urgency. Implement scored local retrieval using category, title, organization, summary, tags, population, insurance type, and geography.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`

Expected: all unit tests pass.

- [ ] **Step 6: Commit domain modules**

Run: `git add . && git commit -m "feat: add resource retrieval and safety logic"`

---

### Task 3: API Routes And Model Wrapper

**Files:**
- Create: `lib/prompts/resource-navigator.ts`
- Create: `lib/ai/model.ts`
- Create: `app/api/resources/route.ts`
- Create: `app/api/chat/route.ts`
- Create: `lib/supabase/schema.sql`

- [ ] **Step 1: Add the resource navigator system prompt**

Use the exact boundaries from the approved instruction file: resource navigation only, plain language, source links, no diagnosis or prescribing, no sensitive personal data collection.

- [ ] **Step 2: Add model wrapper**

Create `getChatModel()` so Groq can later be swapped with another provider. Default `GROQ_MODEL` to `llama-3.1-8b-instant` when unset.

- [ ] **Step 3: Add `/api/resources`**

Support `category`, `state`, `insuranceType`, `population`, and `q` filters against local resources.

- [ ] **Step 4: Add `/api/chat`**

Use `streamText`, retrieve resources for the latest user message, build context, add urgency instructions when needed, and stream the model response. Include resource metadata in the stream data when the SDK supports it.

- [ ] **Step 5: Add Supabase schema**

Create SQL for `resources`, `resource_chunks`, `match_resource_chunks`, and `chat_feedback`.

- [ ] **Step 6: Commit API layer**

Run: `git add . && git commit -m "feat: add chat and resources APIs"`

---

### Task 4: Frontend Experience

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/SafetyNotice.tsx`
- Create: `components/QuickStartButtons.tsx`
- Create: `components/ResourceCard.tsx`
- Create: `components/ChatMessage.tsx`
- Create: `components/Chat.tsx`
- Create: `components/ResourceBrowser.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build static layout components**

Create the header, footer, safety notice, quick-start buttons, and resource cards with accessible labels and keyboard-friendly controls.

- [ ] **Step 2: Build chat component**

Use `useChat` with quick-start prompts, streaming assistant bubbles, a privacy reminder, feedback buttons, and report issue link.

- [ ] **Step 3: Build resource browser**

Fetch `/api/resources`, show filters, and render matching `ResourceCard` entries.

- [ ] **Step 4: Compose homepage**

Use the required hero title and subtitle, primary chat surface, safety notice, and resource browse section.

- [ ] **Step 5: Commit UI**

Run: `git add . && git commit -m "feat: build navigator UI"`

---

### Task 5: Verification And Polish

**Files:**
- Modify as needed based on verification output.

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: no lint errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Next.js builds successfully.

- [ ] **Step 4: Start local dev server**

Run: `npm run dev`

Expected: app is available at a local URL.

- [ ] **Step 5: Browser QA**

Open the local URL and check desktop and mobile-ish widths. Verify the homepage renders, resource cards are visible, quick-start prompts populate chat, and resource filters work.

- [ ] **Step 6: Final commit**

Run: `git status --short`; if verification fixes were needed, commit them with `git commit -m "chore: polish navigator prototype"`.

