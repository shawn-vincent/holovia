# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Next.js dev server on localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking (use before committing)
- `npm run test` - Run Jest tests with Testing Library

## Architecture Overview

This is a Next.js 14 App Router application with TypeScript in strict mode. The architecture follows these key patterns:

### State Management
- **Global State**: Uses React Context + useReducer pattern in `src/context/AppContext.tsx`
- **Persistence**: All state persisted to localStorage with key `holovia:v0`
- **No backend database** - entirely client-side data storage for Phase 0

### Authentication
- **NextAuth** with Google OAuth (JWT sessions)
- Auth config split between `src/auth.config.ts` and `src/auth.ts`
- Serverless auth routes at `src/app/api/auth/[...nextauth]/route.ts`

### Key Components Structure
```
src/
  context/AppContext.tsx          # Global state management + localStorage
  hooks/useOpenRouter.ts          # OpenRouter API client (browser-side)
  types/index.ts                  # Core TypeScript interfaces
  components/
    activities/                   # Activity management components
    chat/ChatDock.tsx            # Bottom chat dock with OpenRouter integration
    ui/                          # Reusable UI components (Button, Input)
  app/
    page.tsx                     # Home page (activities + chat dock)
    settings/page.tsx            # Settings page (API key management)
```

### Data Models
- **Activity**: Trackable items with status, updates, and timestamps
- **ChatMessage**: Chat history with role, content, and activity suggestions
- **UserSettings**: OpenRouter API key, model selection, theme preference
- **AppState**: Complete application state shape

### AI Integration
- **OpenRouter API** integration for chat (user provides their own API key)
- Activity suggestions parsed from special `ACTIVITY_SUGGESTION:{"name":"","description":""}` tokens in responses
- Chat suggestions automatically converted to activities when accepted

### Environment Setup
Copy `.env.local.example` to `.env.local` and configure:
- `NEXTAUTH_SECRET` - Random secret for JWT signing  
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `NEXTAUTH_URL` - Your deployment URL (for production)

## Holovia Project

## Project Documentation Structure

### doc/history/ - Throwaway History Files
**Purpose:** Nonnormative throwaway documents for point-in-time thoughts, drafts, and scratch work.

**Naming Convention:** `yyyy-mm-dd-hh-mm-name-of-file.md`

**Rules:**
- Always check system date/time when creating files: `date "+%Y-%m-%d-%H-%M"`
- These are throwaway documents - may be deleted or ignored at any time
- Not authoritative - official docs should never reference these files
- Use for brainstorming, drafts, meeting notes, experimental ideas

**Example Usage:**
```bash
# Get current timestamp
date "+%Y-%m-%d-%H-%M"
# Create file like: doc/history/2025-09-09-14-30-brainstorm-session.md
```

### doc/requirements/ - Official Requirements
Authoritative project requirements and specifications.

## Available External Tools

### ChatGPT (via Codex CLI)
- **Command**: `codex exec "prompt"` - AI code generation and assistance using GPT-5
- **Model**: GPT-5 with advanced reasoning capabilities
- **Context Size**: 400,000 tokens total (272k input + 128k output)
- **Best for**: 
  - Multi-step reasoning and problem solving
  - Advanced code generation and refactoring
  - Mathematical problem solving (94.6% on AIME 2025)
  - Real-world coding tasks (74.9% on SWE-bench Verified)
  - Multimodal understanding and visual reasoning
  - Complex debugging with step-by-step analysis
- **Key Features**:
  - 80% less likely to hallucinate than previous models
  - Deliberate multi-step thinking process
  - Built-in chain-of-thought reasoning
  - State-of-the-art performance across coding benchmarks
- **Usage Examples**:
  - `codex exec "write a React hook for managing form state with validation"`
  - `codex exec "refactor this component to use TypeScript and add error handling"`
  - `codex exec "explain this algorithm step-by-step and suggest optimizations"`
- **Alias**: Consider `alias cx="codex exec"` for quicker access

## Project Guidelines
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested