---
mode: agent
agent: android-platform
name: android-platform-prompt
description: "Prompt for the android-platform agent. Configures Android manifest permissions, offline caching, camera/gallery access, and platform features."
---

### Requirements

1. **Permissions:** Declare all required permissions explicitly in `AndroidManifest.xml`. Use `tools:replace` for manifest merging conflicts.
2. **Offline Caching:** Configure Hive or shared_preferences for local storage. Provide initialization code and data model examples.
3. **Camera/Gallery:** Set up file provider in `AndroidManifest.xml` and `file_paths.xml`. Handle runtime permission requests.
4. **Resources:** Manage drawables, layouts, and values in `android/app/src/main/res/`.

### Constraints

- All permissions must have corresponding runtime request handling in Flutter/Dart code
- File provider paths must be declared in `res/xml/file_paths.xml`
- Do not modify Flutter/Dart code — that lives in `hub_mobile/`

### Success Criteria

- `AndroidManifest.xml` compiles without merge conflicts
- Permissions appear in the manifest with correct names
- File provider configuration is valid
- Cache initialization code is documented

### Usage Template

```
Add/modify [permissions/features] in AndroidManifest.xml:
- Permissions: [list]
- [Optional] File provider paths: [paths]
- [Optional] Cache type: [Hive | shared_preferences]
Show the diff and wait for my confirmation before applying.
```

### Chat Example

```
User: Add CAMERA and READ_MEDIA_IMAGES permissions to AndroidManifest.xml.
Agent: Adds the permission declarations, sets up file provider paths,
shows diff, and waits for confirmation.
```
