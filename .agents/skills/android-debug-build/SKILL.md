---
name: android-debug-build
description: Build, test, and troubleshoot a debug APK for Android using Flutter and Gradle. Includes build commands, cache management, and common failure resolutions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# Android Debug Build

## Contents
- [Build Commands](#build-commands)
- [Flutter Analyze](#flutter-analyze)
- [Common Failures](#common-failures)
- [Cache Management](#cache-management)

## Build Commands

```bash
# Debug APK
flutter build apk --debug

# Debug APK with specific target platform
flutter build apk --debug --target-platform android-arm,android-arm64

# Release APK (requires signing config)
flutter build apk --release

# Release App Bundle
flutter build appbundle --release
```

## Flutter Analyze

Run before every build to catch issues early:

```bash
flutter analyze
```

Common issues:
- Missing imports — `flutter pub get` to resolve
- Deprecated API usage — check Flutter changelog
- Unused imports — remove or suppress

## Common Failures

### Dependency Conflict

```
What went wrong: Could not resolve all dependencies.
> Conflict with dependency 'androidx.core:core' in project ':app'.
```

**Fix:** Use `resolutionStrategy` in `android/app/build.gradle`:

```groovy
configurations.all {
    resolutionStrategy {
        force 'androidx.core:core:1.12.0'
    }
}
```

### SDK Version Mismatch

```
> The minSdk version XX is greater than the device's API level.
```

**Fix:** Lower `minSdk` in `android/app/build.gradle` or use a device/emulator with a higher API level.

### NDK Not Installed

```
> No version of NDK matched the requested version.
```

**Fix:** Install NDK via SDK Manager or set in `android/gradle.properties`:

```properties
android.ndkVersion=26.1.10909125
```

## Cache Management

```bash
# Clean Flutter build cache
flutter clean

# Clean Gradle cache
cd android && ./gradlew clean

# Clear pub cache
flutter pub cache repair

# Full reset
flutter clean && cd android && ./gradlew clean && cd .. && flutter pub get
```
