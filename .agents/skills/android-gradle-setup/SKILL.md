---
name: android-gradle-setup
description: Configure Gradle build files with SDK versions, signing configs, dependency management, and ProGuard/R8 rules following the project's conventions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# Android Gradle Setup

## Contents
- [SDK Version Configuration](#sdk-version-configuration)
- [Signing Configuration](#signing-configuration)
- [Dependency Management](#dependency-management)
- [ProGuard/R8 Rules](#proguard--r8-rules)
- [Verification](#verification)

## SDK Version Configuration

Set SDK versions in `android/app/build.gradle`:

```groovy
android {
    compileSdk 34
    
    defaultConfig {
        minSdk 26
        targetSdk 34
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
}
```

## Signing Configuration

Configure release signing using GitHub Secrets:

```groovy
signingConfigs {
    release {
        storeFile file(System.getenv("KEYSTORE_PATH") ?: "release.keystore")
        storePassword System.getenv("KEYSTORE_PASSWORD")
        keyAlias System.getenv("KEY_ALIAS")
        keyPassword System.getenv("KEY_PASSWORD")
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

## Dependency Management

Pin dependency versions explicitly:

```groovy
dependencies {
    implementation "com.google.firebase:firebase-messaging:23.4.0"
    implementation "com.google.android.gms:play-services-base:18.3.0"
    implementation "androidx.core:core-ktx:1.12.0"
}
```

## ProGuard/R8 Rules

```pro
# Keep Firebase messaging classes
-keep class com.google.firebase.messaging.** { *; }

# Keep Flutter engine classes
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Keep model classes used in JSON serialization
-keep class com.hub.**.model.** { *; }
```

## Verification

1. `flutter build apk --debug` — debug build compiles
2. `flutter build appbundle --release` — release build compiles (with signing)
3. `./gradlew lint` — lint passes
4. Check ProGuard mapping file for proper obfuscation
