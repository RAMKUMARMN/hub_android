---
name: android-push-setup
description: Configure FCM push notifications and Android App Links (deep links) following the project's conventions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# Android Push Setup

## Contents
- [FCM Configuration](#fcm-configuration)
- [Deep Link Setup](#deep-link-setup)
- [Asset Links](#asset-links)
- [Verification](#verification)

## FCM Configuration

### google-services.json

Place `google-services.json` in `android/app/`. Load via CI secrets — never commit to version control.

### firebase_messaging Plugin

Ensure `pubspec.yaml` includes:

```yaml
dependencies:
  firebase_messaging: ^15.0.0
  firebase_core: ^3.0.0
```

### Verification Checklist

1. `google-services.json` is present in `android/app/`
2. FCM sender ID matches the Firebase project
3. `firebase_messaging` plugin is configured in `pubspec.yaml`
4. Test notification sent via Firebase Console reaches device

## Deep Link Setup

### AndroidManifest.xml Intent Filters

```xml
<activity android:name=".MainActivity"
    android:exported="true">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="app.hub.example.com"
            android:pathPrefix="/workspace/" />
    </intent-filter>
</activity>
```

## Asset Links

Create `/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.hub.app",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

## Verification

1. `adb shell dumpsys package d | grep <package>` — verify intent filters
2. Deep link test: `adb shell am start -d "https://app.hub.example.com/workspace/123"`
3. Digital Asset Links API: `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://app.hub.example.com&relation=delegate_permission/common.handle_all_urls`
