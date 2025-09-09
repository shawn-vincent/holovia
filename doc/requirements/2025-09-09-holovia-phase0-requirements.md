# Holovia Phase 0 Requirements — Proof of Concept (React + Vercel)

## 1) Purpose & Vision (Phase 0)

* **Proof of concept** Vercel React app demonstrating core AI chat interaction
* Simple AI persona that helps users track basic wellness activities
* User can have conversations and create simple activity entries
* Foundation for future holistic support features

---

## 2) Tech Stack (Phase 0)

* **Frontend:** React + TypeScript (Vercel deployment)
* **LLM Access:** OpenRouter with user-provided API key
* **Auth:** Google SSO only (single provider for simplicity)
* **Storage:** Local storage initially (no backend database)
* **No mobile app** (web-only for Phase 0)

---

## 3) Core Experience (Phase 0)

* **Simple chat interface** at bottom of screen (persistent)
* **Basic text-based interaction** with AI assistant
* **Simple activity tracking** - users can create and update activities
* **No complex GUI interactions** (text-only for Phase 0)

---

## 4) Simplified Data Model (Phase 0)

### 4.1 Activities (Simplified)
* **Name/Description** (editable)
* **Simple text updates** (date + text entry)
* **Basic states:** Active, Paused, Complete
* **No practice attachments** (Phase 0)
* **No linking to problems** (Phase 0)

### 4.2 Chat History
* **Persistent conversation** with AI assistant
* **Local storage** for simplicity

---

## 5) Assistant Behavior (Phase 0)

* **Welcoming persona** - asks how user is doing
* **Can suggest creating activities** based on conversation
* **Can help user update existing activities**
* **Basic encouragement and support**
* **No proactive contact** (Phase 0)

---

## 6) Views & Features (Phase 0)

### 6.1 Main Chat View
* **Full-screen chat interface** with AI assistant
* **Activity suggestions** can be accepted to create activities
* **Update prompts** for existing activities

### 6.2 Simple Activities List
* **View all activities** with current status
* **Click to add updates** or change status
* **Basic timeline view** (chronological list of updates)

### 6.3 Settings (Basic)
* **OpenRouter API key** input
* **Model selection** (basic dropdown)
* **Sign out** option

---

## 7) Phase 0 Acceptance Criteria

### Core Functionality
* ✅ **Deploy to Vercel** - functioning React app
* ✅ **Google SSO login** - users can authenticate
* ✅ **OpenRouter integration** - users provide API key, chat works
* ✅ **Activity creation** - via chat suggestions or manual
* ✅ **Activity updates** - add text entries with timestamps
* ✅ **Activity status** - toggle between Active/Paused/Complete
* ✅ **Persistent chat** - conversation history maintained
* ✅ **Local data** - activities and chat stored in browser

### User Experience
* ✅ **Responsive design** - works on desktop and mobile browsers
* ✅ **Chat always visible** - persistent bottom interface
* ✅ **Simple navigation** - between chat and activities list
* ✅ **Basic error handling** - API failures, missing keys

### Technical Requirements
* ✅ **TypeScript** - type safety throughout
* ✅ **Modern React** - hooks, functional components
* ✅ **Clean code structure** - components, hooks, utilities
* ✅ **Environment configuration** - for API keys, OAuth

---

## 8) Explicitly Out of Scope (Phase 0)

* **Practice library** and practice attachments
* **Problems tracking** and extraction
* **Complex timelines** and correlations
* **Proactive contact** (push, email, SMS)
* **Mobile apps** (Capacitor)
* **Backend database** (cloud storage)
* **Data export** functionality
* **Multiple social SSO** providers
* **Activity cloning/merging**
* **Numeric extraction** from updates
* **Advanced summaries** (short/medium/full)
* **Badge system** for practices
* **Memory storage** for AI context

---

## 9) Success Metrics (Phase 0)

* **Deployable app** on Vercel with working authentication
* **Functional AI chat** using user's OpenRouter key
* **Basic activity workflow** - create, update, change status
* **Data persistence** across browser sessions
* **Clean, responsive UI** that works on mobile browsers
* **Foundation architecture** ready for Phase 1 expansion

---

## 10) Next Phase Preview

Phase 1 will add:
* Backend database and cloud storage
* Problems tracking and AI extraction
* Basic practice library
* Mobile app (Capacitor)
* Enhanced AI tools and navigation