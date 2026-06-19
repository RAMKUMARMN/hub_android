import fs from "fs";
import { HUB_ANDROID_PATH } from "../config.js";

export async function discoverAndroidStatusHandler() {
  const files = fs.readdirSync(HUB_ANDROID_PATH);

  const indicators = {
    hasGradle: files.includes("build.gradle"),
    hasSettingsGradle: files.includes("settings.gradle"),
    hasManifest: files.includes("AndroidManifest.xml"),
    hasAppModule: files.includes("app"),
    hasKotlinSources: files.includes("src"),
    hasGradleWrapper: files.includes("gradlew"),
  };

  const initialized = Object.values(indicators).some(Boolean);

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            initialized,
            fileCount: files.length,
            files,
            indicators,
          },
          null,
          2
        ),
      },
    ],
  };
}