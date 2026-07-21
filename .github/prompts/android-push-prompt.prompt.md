---
mode: agent
agent: android-push
name: android-push-prompt
description: "Prompt for the android-push agent. Configures FCM push notifications and Android App Links (deep links)."
---

### Requirements

1. **FCM Setup:** Verify `google-services.json` is present in `android/app/`. Confirm FCM sender ID matches the Firebase project.
2. **Plugin Config:** Ensure `firebase_messaging` plugin is correctly configured in `pubspec.yaml`.
3. **Deep Links:** Configure Android App Links with intent filters in `AndroidManifest.xml`. Create asset links file at `/.well-known/assetlinks.json`.
4. **Testing:** Provide a step-by-step verification checklist for FCM delivery and deep link routing.
5. **Safety:** Never store `google-services.json` in version control — load via CI secrets.

### Constraints

- FCM server key goes in GitHub Secrets, not in code
- Deep link hosts must match verified domain ownership
- Keep `google-services.json` out of version control

### Success Criteria

- FCM test notification is deliverable to target device
- Deep links correctly route to intended app screens
- Asset links file is valid and published
- `firebase_messaging` plugin initializes without errors

### Usage Template

```
Verify/setup FCM for hub_android:
- [Optional] FCM sender ID: [id]
- [Optional] Deep link host: [domain]
- [Optional] Deep link path: [path prefix]
Show diffs and wait for confirmation before applying.
```

### Chat Example

```
User: Verify the FCM setup for hub_android.
Agent: Checks google-services.json presence, validates sender ID, verifies
firebase_messaging plugin, creates verification checklist.
```
