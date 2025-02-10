# AI Agent Plans:
- **Target Persona**: Aimee K. (Senior Developer)
- **Scope**: Confluence + Jira integration
# AI Scope
- The AI never executes actions on it's own. It must suggest stuff to a human to review.
- The AI runs in the background and presents tasks it believes needs done.
- AI also has an explicit interface where it can be prompted.
  - But the main feature is that it runs passively in the background.
# Core Features:
## 1. Code review summarisation
- :x: **AI-generated Code Summaries**: Automatically extract and explian key changes in code submissions in natural language.
- :x: **AI Integration With Jira + Confluence**: AI can grab info from Jira and Confluence to help with generation.
- :x: **Auto-generate Review Checklists**: AI suggests points to review based on commit diffs
- :x: **Highlight Pull Requests**: Highlights risky changes, security concerns, breaking changes.
  - If the AI unsure, it can prompt Aimee to dive deeper
### **Impact:** Save time by letting Aimee focus on critical code sections without needing full project context
## 2. AI-powered documentation assistant
- :x: **Auto-generate Jira Issues:** AI detects patterns in past tickets and auto-fills repetitive fields.
- :x: **Smart Templates:** AI suggests pre-filled documentation based on Jira tasks (e.g., if Aimee writes a bug fix, AI pre-generates a release note template).
- :x: **One-click Action Items:** AI auto-extracts action points from Jira tickets and Confluence docs.
- :x: **Documentation Improvements:** Look at gaps in documentation and suggest places where it could be improved
### **Impact:** Eliminate repetitive manual documentation, reducing frustration. improving productivity
## 3. AI-driven Stale Information Detection
- :x: **Automatic stale information detection:** Detect if information is stale and as such suggests for removal
- :x: **Duplicate detection:** Detect duplicate tickets or documentation and suggest merging or deleting
- :x: **Automated status tracking:** Track an if an issue has not be resolved or documentation not properly updated. Present to aimee to review outdated information.
- :x: **Context-aware Search:** AI prioritizes the most recent and relevant documents when Aimee searches for something.
### **Impact:** Keep information fesh and keeps material up to date.
## Integration plans:
- Jira API
- Confluence API
- LLM-based summarisation
- RAG pipeline (for document insertion)
- Embedding pipeline (for similarity detection)
## Finalised Aim:
- Reduce cognitive load
- Speed up code reviews
- Automate documentation
- Ensure up-to-date information