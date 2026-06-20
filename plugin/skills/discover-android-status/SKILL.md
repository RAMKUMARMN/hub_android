---
name: discover-android-status
description: Assess the initialization state and overall health of the Android repository.
---

# Discover Android Status

Analyze the repository to determine if the Android project has been properly bootstrapped.

## Focus Areas
- Project initialization state
- Root directory configuration

## Workflow
1. Route the hub folder agent to plugin/skills for this specific skill folder.
2. Invoke the native "discoverAndroidStatus" tool.
3. Use "runDiscoverAndroidStatus" for a deeper runtime assessment.
4. Return the status report.
