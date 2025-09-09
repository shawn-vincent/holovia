
# Holovia Prototype Requirements — Holistic-Support Chatbot (React + Capacitor, TypeScript, OpenRouter)

## 1) Purpose & Vision

* Friendly AI persona helps users work through issues.
* Encyclopedic knowledge of holistic practices and behavior-change techniques, including **proactive contact**.
* Users track progress over time via **Activities** (formerly Goals/Activities) and **Problems**; system supports problem discovery, activity/practice suggestions, and per-activity/overall/combined timelines.
* Commercial viability will be analyzed; project proceeds regardless.

> Fidelity: no new features invented; only merged/refactored per your instructions.

---

## 2) Platforms & Tech Constraints

* **Client:** React + TypeScript.
* **Mobile:** Capacitor (iOS & Android).
* **Web:** Same app in browser.
* **LLM Access (OpenRouter):**

  * **User-managed**: user enters their own OpenRouter API key in **Settings**; user bears costs.
  * User can choose free/paid models and **edit the assistant’s system prompt** in **Settings**.
* **Auth:** SSO via Google and other social providers.
* **API:** Internal tool endpoints only (agent/app). **No 3rd-party API in v1**.

---

## 3) Core Experience & UX

* **Unified LLM interaction:** All interactions go **through the agent**. Some are **GUI-based** (chips/forms) and some **text-based**; **both feed the agent**.
* **Pre-processing allowed:** Agent may perform **conventional interpretation** before LLM calls for efficiency; **all navigation** happens via the **same interface/agent**.
* **Persistent chat:** Chat is **always present at the bottom** of the screen.

---

## 4) Knowledge & Tools

* LLM tools access a curated **practice library** (edited by the system’s developers) containing:

  * Problems addressed, description, references;
  * Evidence across multiple dimensions (incl. **scientific** and **community**; others acknowledged);
  * Side effects/risks;
  * **Badge** indicating trustworthiness and risks (single micro-viz **maybe**, design TBD).
* Assistant can **suggest practices**; users can attach practices to Activities or create Activities from suggestions.

---

## 5) User Model

### 5.1 Problems (facts about the person over time)

* Definition: **“Things true about the patient over time.”**
* Extracted from conversation; kept as a **reviewable list**.
* Easy to create new Problems.
* Activities can be **linked/unlinked** to Problems (optional, easy).

### 5.2 Activities (things happening over time)

> **Activities replace Goals and prior Activities.**

**Structure**

* **Description** (editable over time).
* **Practices list** (current practices attached to the activity; editable over time).
* **Stream of dated Updates**.

**Lifecycle & State**

* **States:** **New → (Pause | Cancel | Complete)**; Paused can resume. (“Retire” = Pause/Cancel/Complete.)
* **Clone/Split:** Users can **clone** an Activity (duplicate baseline; start diverging).
* **Merge/Combine:** Users can **merge** Activities (combine descriptions/practices with conflict prompts and **union the update streams**; preserve provenance).

**Updates (Activity entries)**

* **Input types:** numbers, text, drawings, uploaded images, uploaded files.
* **Summaries per update:**

  * **Short** (<5 words)
  * **Medium** (blurb)
  * **Full** (original content preserved)
* **Numeric extraction philosophy:** **Open research track.** Attempt **numeric extraction where applicable** (LLM may assist) while **always preserving raw input**. Work toward **intuitive presentation** as methods evolve.

**Linking**

* Activities can be **linked** to **Problems** (and unlinked).

**Timelines**

* **Per-Activity** timeline from updates (with numeric and summary layers).
* **Overall** timeline across all Activities.
* **Correlated/Combined** timelines (define correlation via shared problem/practice/tags/time windows—visualization TBD).

### 5.3 Memories

* Agent stores **generic, relevant memories** tied to the current context (Problems/Activities).

---

## 6) Assistant Behavior

* Opens with **how the user is** and **what Problems** they face; encourages depth.
* **Problem extraction** → **Activity creation/suggestion** → **Practice suggestion** (with badge).
* Uses tools to read the library, attach practices, update Activities/states, and navigate.
* **Behavior change & support:** may **contact the user proactively** (see §7).

---

## 7) Proactive Contact (Channels & Controls)

* **Channels:** **Push, Email, SMS, In-App**.
* **Consent & controls:** **Opt-in** per channel, **quiet hours**, **rate limits**, **unsubscribe**.
* **Auditability:** All proactive contact events are **auditable**.

---

## 8) Data, Privacy, and Export

* **Data location:** **Cloud**.
* **Export:** Users can **export all their data**.
* (Other privacy/security/compliance details remain unspecified here.)

---

## 9) LLM Configuration & Permissions

* **Settings page:** manage **OpenRouter key**, **model selection** (free/paid), and **system prompt**.
* The agent may **navigate** the app, **create/update Activities**, **change Activity state**, **attach/detach practices**, **read** the practice library, and **store relevant memories**.

---

## 10) State Machines

* **Activities:** **New → (Pause | Cancel | Complete)** with **Resume** from Paused.
* (Problems have no state machine; they persist as truths over time.)

---

## 11) Open Items / To Decide

* Viability analysis (re: future of ChatGPT-class models).
* **Badge micro-viz** exact design and inputs/weights.
* Evidence dimensions beyond scientific/community (acknowledged, unspecified).
* Correlation rules and minimal viable visualization for **combined timelines**.
* Data presentation heuristics and extraction methods will **evolve via research**.

---

## 12) Views & Data

* **Problem list view:** View/add; link/unlink Activities.
* **Activities view:** Create/edit description; manage **practices list**; view/update **stream**; change **state** (Pause/Cancel/Complete); **clone** and **merge**; link/unlink to Problems.
* **Timelines:** Per-Activity, Overall, Correlated/Combined.
* **Chat view:** **Always present at bottom**; shows assistant messages, practice suggestions (with badge), and actionable chips (e.g., **Attach Practice**, **Create Activity**, **Update Activity**).
* **Practice badge:** Show **trustworthiness** and **risks** (single micro-viz **maybe**; design TBD).

---

## 13) Acceptance Criteria (updated)

* **Auth:** Sign in via **Google SSO** and at least one **other social SSO**.
* **Chat UI:** **Always visible** at the bottom on all platforms.
* **LLM Settings:** User can **paste OpenRouter key**, **choose free/paid models**, and **edit system prompt**.
* **Unified Interaction:** **GUI + text** inputs both route **through the agent**; agent may pre-process before LLM; **all navigation via same interface**.
* **Problems:** User can **review/add**; assistant can **extract** Problems from chat; Activities can be **linked/unlinked** to Problems.
* **Activities:** User can **create/edit** Activities, **attach/detach practices**, **post updates** (numbers/text/drawings/images/files), and **change state** (Pause/Cancel/Complete). Assistant can **suggest practices**, **create/update Activities**, and **change state** via tools.
* **Clone/Merge:** User can **clone** an Activity; user can **merge** Activities (combine descriptions/practices with conflict prompts; **union** their update streams; record provenance).
* **Updates & Summaries:** Each update yields **Short/Medium/Full** representations; **numeric extraction attempted where applicable**; raw input preserved.
* **Timelines:** Users can view **per-Activity**, **overall**, and **correlated/combined** timelines.
* **Practice Library:** Each practice shows **problems addressed**, **description**, **references**, **evidence** (incl. scientific & community; others acknowledged), **side effects/risks**, and a **badge** indicating **trustworthiness/risks**.
* **Proactive Contact:** Supports **Push/Email/SMS/In-App** with **opt-in**, **quiet hours**, **rate limits**, **unsubscribe**, and **auditability**.
* **API Access:** **No 3rd-party API** in v1 (internal endpoints only).
* **Data:** Stored in the **cloud**; user can **export all data**.

