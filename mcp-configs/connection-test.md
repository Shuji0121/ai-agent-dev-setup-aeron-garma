# MCP Server Connection Test Evidence

**Author:** aeron garma  
**Date:** March 20, 2026  
**Environment:** Windows 11 + Claude Desktop

---

## Pre-Setup Checklist

Before testing, ensure you have:

- [ ] Node.js installed (verify with `node --version`)
- [ ] GitHub personal access token (classic) generated
- [ ] `claude_desktop_config.json` updated with your GitHub token
- [ ] Claude Desktop restarted after config changes

---

## Server Connection Tests

### Test 1: Rolldice Server ✅

**How to test:**
1. Open Claude Desktop
2. Ask: "Roll a 6-sided die"
3. Claude will use the Rolldice MCP server

**Expected Output:**
```
Claude: I'll roll a 6-sided die for you using the Rolldice server.

[Result: 4]

I rolled a 4 for you!
```

**Status:** _____ (Mark PASS or FAIL after testing)

---

### Test 2: GitHub Server 🔧

**How to test:**
1. Open Claude Desktop
2. Ask: "Can you list my GitHub repositories?"
3. Claude will query GitHub using the GitHub MCP server

**Expected Output:**
```
Claude: I'll check your GitHub repositories.

[Querying GitHub API...]

Here are your repositories:
- ai-agent-dev-setup-aeron-garma (Updated: 1 day ago)
- (other repos...)
```

**Status:** _____ (Mark PASS or FAIL after testing)

**Note:** This test will only work if your GitHub token is correctly configured and has proper scopes.

---

### Test 3: Both Servers Combined 🎯

**The Ultimate Test:**

Ask Claude:
```
"Can you roll a dice and then list my GitHub repos? 
Show me you're using both the Rolldice and GitHub MCP servers."
```

**Expected Output:**
```
I'll test both servers for you.

[Using Rolldice server...] I rolled a 5
[Using GitHub server...] You have 3 repositories

Proof: Both the Rolldice and GitHub MCP servers are working!
```

**Status:** _____ (Mark PASS or FAIL after testing)

---

## Troubleshooting Results

If servers don't work, test these steps:

### If Rolldice doesn't work:
- [ ] Claude Desktop restarted?
- [ ] Config file syntax correct? (check for missing commas, brackets)
- [ ] Node.js installed?

### If GitHub doesn't work:
- [ ] Token is correct classic token (not fine-grained)?
- [ ] Token has scopes: `repo`, `read:org`, `workflow`?
- [ ] Token is not expired?
- [ ] Claude Desktop restarted after adding token?

---

## Screenshot Evidence (TO FILL IN)

After successful testing:

1. **Screenshot: Rolldice Test Result**
   - Location: Insert screenshot of Claude rolling a dice
   
2. **Screenshot: GitHub Test Result**
   - Location: Insert screenshot of Claude listing repos
   
3. **Screenshot: Combined Test**
   - Location: Insert screenshot showing both servers working together

---

## Summary

| Server | Test Status | Notes |
|--------|------------|-------|
| Rolldice | PENDING | Test by asking Claude to roll a dice |
| GitHub | PENDING | Test by asking Claude to list repos |
| Bootcamp Agent | NOT YET | Optional configuration |
| Calendar | NOT YET | Optional configuration |

---

## Verification Complete

Once all tests pass, your MCP servers are ready for the Week 1 submission!

Next steps:
1. Document your findings here
2. Take screenshots of working servers
3. Create GitHub repository with these files
4. Push to GitHub
5. Submit repository link
