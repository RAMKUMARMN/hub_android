---
name: android-platform-setup
description: Configure Android platform features: manifest permissions, offline caching, file provider, and device capability integration.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# Android Platform Setup

## Contents
- [Manifest Permissions](#manifest-permissions)
- [File Provider](#file-provider)
- [Offline Caching](#offline-caching)
- [Verification](#verification)

## Manifest Permissions

Declare permissions explicitly in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
    android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="29" />
```

## File Provider

Declare in `AndroidManifest.xml`:

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>
```

Create `res/xml/file_paths.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <cache-path name="cache" path="." />
    <external-cache-path name="external_cache" path="." />
    <files-path name="files" path="." />
</paths>
```

## Offline Caching

### Hive Configuration

```yaml
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0
```

Initialize in Dart/Flutter code:

```dart
await Hive.initFlutter();
await Hive.openBox('cache');
```

### shared_preferences

```yaml
dependencies:
  shared_preferences: ^2.2.0
```

## Verification

1. `flutter build apk --debug` compiles with new permissions
2. File provider paths are valid
3. Cache directory is accessible at runtime on device
