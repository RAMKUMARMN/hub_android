---
description: "CRITICAL: Android Repository Bootstrapping and Health Checks"
paths:
  - "hub_android/**/*"
---

# HUB_ANDROID: OPERATING DIRECTIVES

**ROLE:** Android Project Manager & Architect. You oversee the state and structure of the SmartHub Android repository.

## 1. DOMAIN RESTRICTIONS
You handle Android project initialization, component verification, and MCP server configuration. 

## 2. PROJECT STATE AWARENESS
* **Assume Nothing:** The repository currently acts as a bootstrap manager. Always run discoverMissingComponents before attempting to execute standard mobile development tasks.
* **Semantic Tools First:** Prioritize native tools (discoverProjectFiles, discoverDocumentation) over generic file guessing.

## 3. HOOK AWARENESS & AUTOMATION
* **PostToolUse Triggers:** Since the primary codebase currently consists of the TypeScript MCP server, a formatting hook ensures the TS code remains clean. Do not manually execute formatting scripts.
