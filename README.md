# AI Agent Developer Setup - aeron garma

**Workshop Cohort:** GARMA-WEEK1  
**Date:** March 20, 2026

---

## 👋 About Me
- **Name:** aeron garma
- **Cohort:** GARMA-WEEK1
- **GitHub:** Shuji0121

---

## 📋 Development Environment Checklist

### ✅ Node.js Installed
```bash
node --version
```
**Status:** ✅ Installed (v24.9.0)

---

### ✅ Git Installed
```bash
git --version
```
**Status:** ✅ Installed

---

### ✅ VS Code Insider with GitHub Copilot
**Status:** ✅ Running with Copilot enabled

---

### ✅ Claude Desktop with 4 MCP Servers
| Server | Status |
|--------|--------|
| rolldice | ✅ Connected |
| bootcamp-agent | ✅ Connected |
| calendar-booking | ✅ Connected |
| github | ✅ Connected |

---

## 🖥️ MCP Servers Overview

### 1. Rolldice 🎲
**Purpose:** Random dice generation and MCP connectivity testing  
**Functionality:** Roll dice with configurable sides (default: 6)  
**Use Case:** Test tool-calling workflows, generate random numbers
<img width="2558" height="1599" alt="image" src="https://github.com/user-attachments/assets/26eec53d-cec6-495f-845e-378ddd0c3817" />

---

### 2. Bootcamp AI Agent 📚
**Purpose:** Bootcamp curriculum and learning guidance  
**Functionality:** Retrieve week-specific information, learning paths  
**Use Case:** Coordinate bootcamp assignments and provide context-aware help
<img width="1197" height="800" alt="image" src="https://github.com/user-attachments/assets/a24cf40e-5aad-4fcf-b1e1-65cc08a9d4bc" />

---

### 3. Calendar Booking 📅
**Purpose:** Schedule management and meeting coordination  
**Functionality:** Check availability, create bookings, manage conflicts  
**Use Case:** Automate scheduling without leaving Claude chat
<img width="1180" height="716" alt="image" src="https://github.com/user-attachments/assets/a6cd9df8-f4bc-419f-8598-833505464a5a" />

---

### 4. GitHub MCP Server 🔗
**Purpose:** Direct GitHub repository interaction  
**Functionality:** List repos, create issues, view commit history  
**Use Case:** Automate GitHub workflows from Claude
<img width="1310" height="1116" alt="image" src="https://github.com/user-attachments/assets/b7edeefa-6db2-473d-9fa2-bb2866a8a5f7" />

---

## 🛠️ Troubleshooting

### Issue: MCP Servers Not Connecting
**Solution:**
1. Verify config file at: `C:\Users\{username}\AppData\Roaming\Claude\claude_desktop_config.json`
2. Check JSON syntax is valid
3. Restart Claude Desktop completely
4. Wait 10+ seconds for initialization

**What I did:** Fixed JSON config multiple times; ensured proper MCP protocol implementation

---

### Issue: GitHub Server Shows Wrong Username
**Solution:**
1. Update hardcoded username in server code
2. Replace default repo names with actual repositories
3. Restart Claude Desktop

**What I did:** Changed server from "aerongarma" to "Shuji0121"

---

### Issue: Node.js Not Found
**Solution:**
1. Reinstall from https://nodejs.org
2. Restart computer (not just terminal)
3. Verify with `node --version`

---

## 📁 Repository Structure

```
ai-agent-dev-setup-aeron-garma/
├── README.md
├── reflection.md
├── VERIFICATION.md
└── mcp-configs/
    ├── claude-desktop-config.json
    ├── mcp-servers-list.md
    └── connection-test.md
```

---

**Status:** ✅ Environment Ready for AI Agent Development  
**Last Updated:** March 20, 2026
