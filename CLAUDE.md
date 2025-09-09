# CLAUDE.md - Holovia Project

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