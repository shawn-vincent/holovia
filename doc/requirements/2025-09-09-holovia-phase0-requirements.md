# Holovia Phase 0 Requirements — One-Shot LLM Project Generation (React + Vercel)

## 1) Business Context & Success Criteria

### Problem Statement
Create a **minimum viable proof-of-concept** for a holistic wellness support chatbot that demonstrates AI-assisted activity tracking and user engagement. This Phase 0 serves as validation for the broader Holovia vision of comprehensive holistic health support with AI-powered problem discovery, practice suggestions, and behavioral change assistance.

### Success Criteria (SMART)
* **Specific:** Deployable React app with working AI chat and activity tracking
* **Measurable:** 
  - 100% authentication success rate via Google SSO
  - <3 second chat response times with user-provided OpenRouter key
  - 100% data persistence across browser sessions
  - Responsive design working on desktop and mobile browsers
* **Achievable:** Uses proven tech stack (React + TypeScript + Vercel)
* **Relevant:** Validates core user flow of AI conversation → activity creation → progress tracking
* **Time-bound:** Complete MVP within development cycle

### User Value Proposition
Users can immediately start tracking wellness activities through natural conversation with an AI assistant, creating a foundation for deeper holistic health support in future phases.

---

## 2) Technical Context & Deployment

### Target Platform
* **Deployment:** Vercel (serverless React deployment)
* **Domain:** Custom domain or Vercel-provided subdomain
* **Performance:** Static site generation where possible, client-side hydration

### Technology Stack Constraints
* **Frontend Framework:** React 18+ with TypeScript 5+
* **Build System:** Vite or Next.js (Vercel-optimized)
* **State Management:** React Context + useReducer (no external state library)
* **Styling:** CSS Modules or Tailwind CSS (consistent with modern React patterns)
* **LLM Integration:** OpenRouter API (user-provided keys)
* **Authentication:** Google OAuth 2.0 via established provider (Auth0, NextAuth, or Firebase Auth)
* **Data Storage:** Browser localStorage with JSON serialization
* **No Backend Database** (Phase 0 constraint)

### Integration Requirements
* **OpenRouter API:** REST API integration with error handling and rate limiting
* **Google SSO:** Secure OAuth flow with proper token management
* **Browser Storage:** Robust serialization/deserialization with versioning for future migration
* **Responsive Design:** Mobile-first CSS with breakpoints for tablet/desktop

---

## 3) Functional Requirements & User Stories

### Core User Journey
1. **Authentication:** User visits app → clicks "Sign in with Google" → authenticated
2. **Onboarding:** First-time user sees welcome message and API key setup prompt
3. **Configuration:** User enters OpenRouter API key → selects preferred model
4. **Conversation:** User chats with AI assistant about wellness goals/challenges
5. **Activity Creation:** AI suggests activity → user accepts → activity created
6. **Progress Tracking:** User updates activities via chat or direct interaction
7. **Timeline Review:** User reviews activity history and progress over time

### Detailed User Stories

**US-001: Authentication**
- **As a** new user
- **I want to** sign in with my Google account
- **So that** my data is associated with my identity and persists across sessions
- **Acceptance Criteria:**
  - Google SSO button prominently displayed on landing page
  - Successful authentication redirects to main app
  - User profile (name, email, avatar) displayed in header
  - Logout functionality available

**US-002: API Configuration**
- **As an** authenticated user
- **I want to** configure my OpenRouter API key and model preferences
- **So that** I can have AI conversations within my budget and preferences
- **Acceptance Criteria:**
  - Settings page accessible from main navigation
  - API key input field with masked display after saving
  - Model selection dropdown with free/paid models clearly marked
  - Settings persist across sessions
  - Clear error messages for invalid keys

**US-003: AI Conversation**
- **As a** user
- **I want to** have natural conversations with an AI wellness assistant
- **So that** I can discuss my health goals and challenges
- **Acceptance Criteria:**
  - Chat interface always visible at bottom of screen
  - Conversation history persists across sessions
  - AI responds with empathy and wellness expertise
  - Response times under 3 seconds for normal queries
  - Error handling for API failures with user-friendly messages

**US-004: Activity Creation**
- **As a** user discussing wellness goals
- **I want** the AI to suggest creating trackable activities
- **So that** I can organize my wellness journey
- **Acceptance Criteria:**
  - AI recognizes opportunities to suggest activities from conversation
  - Activity creation prompts are clear and actionable
  - Users can accept/decline activity suggestions
  - Manual activity creation also available
  - Activities have meaningful names and descriptions

**US-005: Progress Tracking**
- **As a** user with active wellness activities
- **I want to** record my progress and experiences
- **So that** I can track my wellness journey over time
- **Acceptance Criteria:**
  - Activities list view shows all user activities
  - Each activity displays current status (Active, Paused, Complete)
  - Users can add text updates with timestamps
  - Updates can be added via chat interface or direct input
  - Activity status can be changed (pause, resume, complete)

---

## 4) Data Models & Schema

### 4.1 User Profile
```typescript
interface UserProfile {
  id: string;           // Google OAuth subject
  email: string;        // Google OAuth email
  name: string;         // Google OAuth name
  avatar?: string;      // Google OAuth picture
  createdAt: Date;
  lastLoginAt: Date;
}
```

### 4.2 Settings
```typescript
interface UserSettings {
  openRouterApiKey: string;
  selectedModel: string;           // e.g., "gpt-3.5-turbo", "claude-3-sonnet"
  systemPrompt?: string;          // Custom system prompt (future feature)
  theme: 'light' | 'dark' | 'auto';
}
```

### 4.3 Activity
```typescript
interface Activity {
  id: string;                     // UUID
  name: string;                   // Activity title
  description: string;            // Detailed description
  status: 'active' | 'paused' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  updates: ActivityUpdate[];
}

interface ActivityUpdate {
  id: string;                     // UUID
  content: string;                // User's update text
  timestamp: Date;
  source: 'chat' | 'direct';      // How the update was created
}
```

### 4.4 Chat Message
```typescript
interface ChatMessage {
  id: string;                     // UUID
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  activitySuggestions?: ActivitySuggestion[];
}

interface ActivitySuggestion {
  suggestedName: string;
  suggestedDescription: string;
  accepted: boolean;
  createdActivityId?: string;
}
```

---

## 5) AI Assistant Specifications

### 5.1 System Prompt & Persona
```
You are a compassionate wellness assistant helping users track and improve their holistic health journey. Your role is to:

1. Listen empathetically to users' wellness goals and challenges
2. Suggest trackable activities based on conversation context
3. Encourage consistent progress tracking and reflection
4. Provide supportive, non-judgmental responses
5. Focus on sustainable, gradual improvements

Key Guidelines:
- Always ask permission before creating activities
- Encourage users to describe their experiences in detail
- Celebrate small wins and progress
- Avoid medical advice - suggest consulting professionals when appropriate
- Keep suggestions simple and achievable for Phase 0

Capabilities in this app:
- You can suggest creating activities when users discuss wellness goals
- You can help users add updates to existing activities
- You can view user's current activities to provide contextual support
- Data is stored locally in their browser (privacy-focused)
```

### 5.2 AI Behavior Patterns

**Conversation Starters:**
- "How are you feeling today? What's on your mind regarding your wellness journey?"
- "I'd love to hear about any health or wellness goals you've been thinking about."
- "What aspects of your wellbeing would you like to focus on or improve?"

**Activity Suggestion Triggers:**
- User mentions wanting to start a habit (exercise, meditation, etc.)
- User describes a challenge they want to work on
- User expresses interest in tracking something over time
- User asks for help with goal-setting

**Progress Tracking Support:**
- Regularly ask about existing activities during conversations
- Encourage detailed updates that capture both objective progress and subjective experience
- Suggest reflection questions to deepen user insight
- Recognize patterns and celebrate improvements

---

## 6) User Interface Specifications

### 6.1 Layout & Navigation
```
┌─────────────────────────────────────┐
│ Header: [Logo] [User Avatar] [Menu] │
├─────────────────────────────────────┤
│                                     │
│         Main Content Area           │
│    (Activities List or Settings)    │
│                                     │
├─────────────────────────────────────┤
│          Chat Interface             │
│ ┌─────────────────────────────────┐ │
│ │      Conversation History       │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ [Message Input] [Send] [Settings]   │
└─────────────────────────────────────┘
```

### 6.2 Activities List View
**Layout:**
- Card-based design for each activity
- Clear visual hierarchy: Name → Description → Status → Recent Updates
- Action buttons: "Add Update", "Change Status", "View Timeline"
- Empty state with call-to-action to start chatting

**Activity Card Components:**
```jsx
<ActivityCard>
  <ActivityHeader>
    <Title>{activity.name}</Title>
    <StatusBadge status={activity.status} />
  </ActivityHeader>
  <Description>{activity.description}</Description>
  <RecentUpdates updates={activity.updates.slice(-2)} />
  <ActionButtons>
    <Button variant="primary">Add Update</Button>
    <Button variant="secondary">Change Status</Button>
    <Button variant="tertiary">View Timeline</Button>
  </ActionButtons>
</ActivityCard>
```

### 6.3 Chat Interface
**Requirements:**
- Fixed position at bottom of screen (minimum 200px height)
- Expandable to larger size when focused
- Message history scrollable within chat area
- Auto-scroll to bottom on new messages
- Typing indicators for AI responses
- Activity suggestion cards inline with chat messages

**Message Types:**
- User messages (right-aligned, blue)
- AI messages (left-aligned, gray)
- Activity suggestion cards (special formatting with accept/decline buttons)
- System messages (centered, light text)

### 6.4 Settings Page
**Sections:**
1. **API Configuration**
   - OpenRouter API key input (password field)
   - Model selection dropdown with cost indicators
   - Test connection button
2. **User Profile**
   - Display Google profile info (read-only)
   - Account creation date
3. **App Preferences**
   - Theme selection (light/dark/auto)
   - Chat interface size preference
4. **Data Management**
   - Export data button (JSON download)
   - Clear all data button (with confirmation)
5. **Account**
   - Sign out button

---

## 7) Non-Functional Requirements

### 7.1 Performance Requirements
* **Page Load Time:** Initial app load < 2 seconds on 3G connection
* **Chat Response Time:** AI responses display within 3 seconds of user message
* **Local Storage:** Data serialization/deserialization < 100ms for typical datasets
* **Responsive Design:** UI responds to user interactions within 16ms (60fps)
* **Bundle Size:** JavaScript bundle < 500KB gzipped

### 7.2 Security Requirements
* **Authentication:** Secure OAuth2 flow with Google, proper token storage
* **API Keys:** Client-side encryption of OpenRouter API keys before localStorage
* **Data Protection:** No sensitive data logged or transmitted to unauthorized endpoints
* **HTTPS:** All communications over HTTPS in production
* **Content Security Policy:** Proper CSP headers to prevent XSS attacks

### 7.3 Accessibility Requirements
* **WCAG 2.1 AA Compliance:** Meet accessibility standards for public web apps
* **Keyboard Navigation:** All functionality accessible via keyboard
* **Screen Readers:** Proper ARIA labels and semantic HTML
* **Color Contrast:** 4.5:1 ratio for normal text, 3:1 for large text
* **Focus Management:** Clear focus indicators and logical tab order

### 7.4 Browser Compatibility
* **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
* **Mobile Browsers:** iOS Safari 14+, Chrome Mobile 90+
* **Progressive Enhancement:** Core functionality works without JavaScript
* **Responsive Breakpoints:** 320px (mobile), 768px (tablet), 1024px (desktop)

---

## 8) Quality Assurance Framework

### 8.1 Testing Requirements
```json
{
  "testingFramework": "Jest + React Testing Library",
  "testCoverage": "> 80% for critical paths",
  "testTypes": {
    "unit": "Component logic, utility functions, data models",
    "integration": "API calls, localStorage, authentication flow", 
    "e2e": "Complete user journeys using Playwright",
    "accessibility": "axe-core automated testing"
  },
  "mockingStrategy": "Mock OpenRouter API and Google OAuth in tests"
}
```

### 8.2 Code Quality Standards
```json
{
  "linting": "ESLint with TypeScript recommended rules",
  "formatting": "Prettier with consistent configuration",
  "typeChecking": "Strict TypeScript with no implicit any",
  "bundleAnalysis": "Bundle analyzer to monitor size increases",
  "commitHooks": "Pre-commit hooks for linting and testing"
}
```

### 8.3 Deployment Validation
* **Build Process:** Clean build with no warnings or errors
* **Environment Variables:** All required env vars configured in Vercel
* **Domain Setup:** Custom domain (if applicable) with SSL certificate
* **Monitoring:** Basic error tracking and performance monitoring
* **Rollback Plan:** Previous version deployable within 5 minutes

---

## 9) Implementation Strategy & Architecture

### 9.1 Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base components (Button, Input, etc.)
│   ├── chat/            # Chat-specific components
│   └── activities/      # Activity-related components
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   ├── useOpenRouter.ts # LLM API integration
│   └── useLocalStorage.ts # Data persistence
├── services/            # External service integrations
│   ├── openRouter.ts    # OpenRouter API client
│   ├── auth.ts          # Google OAuth client
│   └── storage.ts       # LocalStorage abstraction
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── pages/               # Route components (if using routing)
```

### 9.2 State Management Architecture
```typescript
// Global App State
interface AppState {
  user: UserProfile | null;
  settings: UserSettings;
  activities: Activity[];
  chatHistory: ChatMessage[];
  uiState: {
    isLoading: boolean;
    error: string | null;
    chatExpanded: boolean;
  };
}

// State Management Pattern: React Context + useReducer
// - Separate contexts for different concerns
// - Custom hooks to abstract state logic
// - Optimistic updates for better UX
```

### 9.3 Development Phases
**Phase 1 (Foundation):** Authentication, basic UI, project structure
**Phase 2 (Core Features):** Chat interface, OpenRouter integration
**Phase 3 (Activities):** Activity CRUD, local storage, basic AI suggestions
**Phase 4 (Polish):** Error handling, responsive design, accessibility
**Phase 5 (Deployment):** Vercel deployment, testing, performance optimization

---

## 10) Acceptance Criteria (Updated)

### 10.1 Core Functionality ✅
1. **Authentication Flow**
   - [ ] Google SSO login/logout works correctly
   - [ ] User profile displayed after authentication
   - [ ] Unauthenticated users redirected to login
   - [ ] Session persistence across browser refreshes

2. **Settings Management**
   - [ ] OpenRouter API key can be saved and retrieved
   - [ ] Model selection dropdown populated from OpenRouter API
   - [ ] Settings persist in localStorage
   - [ ] Invalid API key shows clear error message

3. **Chat Interface**
   - [ ] Chat interface always visible at bottom of screen
   - [ ] Messages send and receive correctly
   - [ ] Conversation history persists across sessions
   - [ ] AI responses display within 3 seconds
   - [ ] Error handling for API failures

4. **Activity Management**
   - [ ] Activities can be created via AI suggestions
   - [ ] Activities can be created manually
   - [ ] Activity status can be changed (active/paused/completed)
   - [ ] Activity updates can be added with timestamps
   - [ ] Activities persist in localStorage

### 10.2 User Experience ✅
1. **Responsive Design**
   - [ ] Works on desktop browsers (1024px+ width)
   - [ ] Works on tablet browsers (768px-1024px width)
   - [ ] Works on mobile browsers (320px-768px width)
   - [ ] Touch interactions work on mobile devices

2. **Performance**
   - [ ] Initial page load under 2 seconds
   - [ ] Chat responses under 3 seconds
   - [ ] No noticeable UI lag during interactions
   - [ ] Smooth animations and transitions

3. **Accessibility**
   - [ ] Keyboard navigation works for all features
   - [ ] Screen reader compatibility
   - [ ] Proper color contrast ratios
   - [ ] ARIA labels on interactive elements

### 10.3 Technical Requirements ✅
1. **Code Quality**
   - [ ] TypeScript strict mode with no implicit any
   - [ ] ESLint passes with no warnings
   - [ ] Prettier formatting consistent
   - [ ] Test coverage > 80% for critical paths

2. **Deployment**
   - [ ] Builds successfully on Vercel
   - [ ] Environment variables configured correctly
   - [ ] HTTPS enabled in production
   - [ ] Custom domain configured (if applicable)

---

## 11) Explicitly Out of Scope (Phase 0)

### Features Deferred to Later Phases
* **Practice Library:** Curated practices with evidence ratings and badges
* **Problems Tracking:** AI extraction and management of user problems over time
* **Complex Timelines:** Multi-activity correlations and advanced visualizations
* **Proactive Contact:** Push notifications, email, SMS outreach
* **Mobile Applications:** Native iOS/Android apps via Capacitor
* **Cloud Database:** Backend API and cloud data storage
* **Advanced Data Features:**
  - Data export/import functionality
  - Multiple social SSO providers beyond Google
  - Activity cloning and merging capabilities
  - Numeric extraction from text updates
  - Multi-level summaries (short/medium/full)
  - AI memory and context persistence across sessions

### Technical Limitations for Phase 0
* **No Backend Services:** All data stored locally, no server-side processing
* **Single Authentication:** Only Google SSO, no other providers
* **Basic AI Integration:** Simple chat without advanced tool calling or function execution
* **Limited Data Analysis:** No analytics, reporting, or trend analysis
* **No Real-time Features:** No live updates, notifications, or multi-device sync

---

## 12) Success Metrics & Validation

### 12.1 Technical Success Criteria
* **100% Deployment Success:** App builds and deploys to Vercel without errors
* **Authentication Reliability:** 99%+ success rate for Google SSO flow
* **Performance Benchmarks:**
  - Initial load time < 2 seconds on 3G
  - Chat response time < 3 seconds average
  - localStorage operations < 100ms
* **Browser Compatibility:** Works on all specified modern browsers
* **Code Quality:** Passes all linting, type checking, and test coverage requirements

### 12.2 User Experience Validation
* **Core User Flow Success:** New user can complete full journey (auth → setup → chat → create activity → add update) without confusion
* **Mobile Experience:** All functionality works smoothly on mobile browsers
* **Error Recovery:** Users can recover from common error states (network issues, invalid API keys)
* **Data Persistence:** User data survives browser refreshes and return visits

### 12.3 Foundation Quality for Phase 1
* **Extensible Architecture:** Code structure supports adding backend integration
* **Type Safety:** Strong TypeScript types enable safe refactoring
* **Component Reusability:** UI components can be extended for future features
* **Testing Coverage:** Critical paths have test coverage to prevent regression

---

## 13) Risk Mitigation & Contingencies

### 13.1 Technical Risks
**Risk:** OpenRouter API changes or reliability issues
**Mitigation:** Abstract API integration behind service layer, implement retry logic and graceful degradation

**Risk:** Google OAuth service disruption
**Mitigation:** Clear error messaging, temporary anonymous mode for demo purposes

**Risk:** LocalStorage size limits
**Mitigation:** Implement data cleanup strategies, warn users at 80% capacity

### 13.2 User Experience Risks
**Risk:** Complex setup process for OpenRouter API key
**Mitigation:** Detailed onboarding flow with screenshots and clear instructions

**Risk:** Poor AI responses due to inadequate system prompts
**Mitigation:** Iterative testing and refinement of prompts with real user scenarios

**Risk:** Data loss on browser clear/device change
**Mitigation:** Prominent warnings about local storage, export functionality for backup

---

## 14) Future Phase Integration Points

### 14.1 Backend Integration Ready
* **Data Models:** TypeScript interfaces designed for easy API serialization
* **Authentication:** Token management ready for backend validation
* **State Management:** Architecture supports switching from localStorage to API calls

### 14.2 Mobile App Preparation
* **Responsive Design:** Mobile-first approach ensures smooth Capacitor integration
* **Touch Interactions:** UI designed for both mouse and touch input
* **Performance:** Optimized for mobile device constraints

### 14.3 Advanced Features Foundation
* **Extensible AI System:** Chat interface can support additional AI capabilities
* **Activity Model:** Data structure ready for practice attachments and problem linking
* **Component Architecture:** Modular design supports feature additions

This Phase 0 provides a solid, deployable foundation that validates core concepts while establishing the technical and user experience patterns for the full Holovia vision.