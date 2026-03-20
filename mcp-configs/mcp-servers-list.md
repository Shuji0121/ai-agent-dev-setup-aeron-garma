# MCP Servers Configuration

## Overview
This document describes the MCP (Model Context Protocol) servers connected to Claude Desktop.

---

## 1. Rolldice Server
- **Server ID:** `rolldice`
- **Purpose:** Utility server for random number generation and simple testing
- **What it does:** Provides dice-roll functionality to test MCP connectivity
- **Usage:** Ask Claude to "roll a dice" or "generate a random number"
- **Status:** ✅ Ready to use

---

## 2. GitHub Server
- **Server ID:** `github`
- **Purpose:** Interact with GitHub repositories, issues, pull requests, and commits
- **What it does:** 
  - Query repository information
  - List and create issues
  - Manage pull requests
  - Search code
  - View commit history
- **Usage:** Ask Claude to "check my GitHub repos" or "create a GitHub issue"
- **Required:** GitHub Personal Access Token (classic)
- **Status:** ⏳ Requires GITHUB_TOKEN configuration

---

## 3. Bootcamp AI Agent (OPTIONAL)
- **Server ID:** `bootcamp-agent`
- **Purpose:** Custom bootcamp-specific workflows and guidance
- **What it does:** Provides bootcamp curriculum, learning paths, and assignment guidance
- **Configuration:** Requires custom setup (contact bootcamp admin for details)
- **Status:** 🔲 Optional - not configured yet

---

## 4. Calendar Booking (OPTIONAL)
- **Server ID:** `calendar`
- **Purpose:** Schedule management and booking automation
- **What it does:**
  - Check calendar availability
  - Create bookings
  - View upcoming events
- **Configuration:** Requires Google Calendar credentials or similar
- **Status:** 🔲 Optional - not configured yet

---

## How to Use These Servers

Once configured, you can ask Claude Desktop:

### Rolldice Examples:
- "Roll a 20-sided die"
- "Generate a random number between 1 and 100"

### GitHub Examples:
- "List my repositories"
- "Show me my recent commits"
- "Create an issue for Week 1 completion"
- "What files are in my repo?"

### Calendar Examples:
- "When am I free tomorrow?"
- "Schedule a meeting for next Monday at 2 PM"

---

## Configuration Status

| Server | Status | Token Needed |
|--------|--------|--------------|
| Rolldice | ✅ Configured | No |
| GitHub | ⏳ Needs token | Yes (Classic) |
| Bootcamp AI Agent | 🔲 Optional | Contact admin |
| Calendar Booking | 🔲 Optional | Google credentials |

---

## Next Steps

1. Get a GitHub Personal Access Token (classic) from https://github.com/settings/tokens
2. Replace `YOUR_GITHUB_CLASSIC_TOKEN_HERE` in `claude-desktop-config.json` with your actual token
3. Copy the config file to Claude Desktop settings
4. Restart Claude Desktop
5. Test with: "Roll a dice" and "List my GitHub repos"
