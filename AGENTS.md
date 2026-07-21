# AI Agent Registry

This file documents the specialized agents available within this repository for automated orchestration.

| Agent Name | Capability | Use Case |
| :--- | :--- | :--- |
| `android-gradle` | Build & Dependencies | Versioning, build flavors, local database setup, dependency management. |
| `android-push` | FCM & Notifications | Notification services, google-services.json, FCM intent filters. |
| `android-platform` | Manifest & Permissions | Deep links, system permissions, native bindings (MethodChannels). |
| `android-ci` | CI/CD Pipelines | GitHub Actions, automated testing, build pipeline setup. |
| `android-planner` | Architecture | Project roadmap, breaking down features, task scoping. |
| `android-code-reviewer` | Quality | Bug detection, security auditing, style enforcement. |

---
## Usage Guidelines
- All agents are managed by the `android-agent`.
- For direct task execution, invoke the agent explicitly (e.g., "Use android-gradle to...").
- For assistance in identifying which agent to use for a specific feature, ask the Coordinator to reference this registry.
