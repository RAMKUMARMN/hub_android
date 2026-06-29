---
name: android-ci-workflow
description: Create a GitHub Actions CI workflow for Android builds with Flutter lint, test, APK/AAB build, caching, signing, and notifications.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# Android CI Workflow

## Contents
- [Workflow Layout](#workflow-layout)
- [Triggers](#triggers)
- [Jobs](#jobs)
- [Caching](#caching)
- [Signing](#signing)
- [Required Secrets](#required-secrets)

## Workflow Layout

```
.github/workflows/
└── android-build.yml
```

## Triggers

```yaml
name: Android CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

## Jobs

| Job | Command | Purpose |
|---|---|---|
| `lint` | `flutter analyze` | Dart static analysis |
| `test` | `flutter test` | Unit and widget tests |
| `build-apk` | `flutter build apk --debug` | Debug APK build |
| `build-release` | `flutter build appbundle --release` | Release AAB (manual dispatch) |

### Example workflow

```yaml
name: Android CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter analyze

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter test

  build-apk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter build apk --debug
      - uses: actions/upload-artifact@v4
        with:
          name: debug-apk
          path: build/app/outputs/flutter-apk/*.apk
```

## Caching

```yaml
- uses: subosito/flutter-action@v2
  with:
    flutter-version: "3.x"
    cache: true
```

Also cache Gradle:

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.gradle/caches
      ~/.gradle/wrapper
    key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
```

## Signing

Release signing uses GitHub Secrets:

```yaml
- name: Build Release AAB
  run: flutter build appbundle --release
  env:
    KEYSTORE_BASE64: ${{ secrets.KEYSTORE_BASE64 }}
    KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
    KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
    KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
```

## Required Secrets

| Secret | Description |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded keystore file |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_ALIAS` | Signing key alias |
| `KEY_PASSWORD` | Signing key password |
| `SLACK_WEBHOOK_URL` | Slack webhook for failure notifications |
