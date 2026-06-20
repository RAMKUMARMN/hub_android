---
name: discover-missing-components
description: Identify missing foundational Android files (Gradle, Manifest, App source).
---

# Discover Missing Components

Perform a gap analysis on the repository structure.

## Focus Areas
- Missing build scripts (build.gradle, settings.gradle)
- Missing application manifests (AndroidManifest.xml)
- Missing source directories (app/src/main/)

## Workflow
1. Route the hub folder agent to plugin/skills for this specific skill folder.
2. Invoke the native "discoverMissingComponents" tool.
3. Return the list of required architectural gaps.
