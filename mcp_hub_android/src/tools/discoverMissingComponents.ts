import fs from "fs";
import { HUB_ANDROID_PATH } from "../config.js";

export async function discoverMissingComponentsHandler() {
  const expected = [
    "app",
    "src",
    "res",
    "build.gradle",
    "settings.gradle",
  ];

  const existing = fs.readdirSync(HUB_ANDROID_PATH);

  const missing = expected.filter(
    item => !existing.includes(item)
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(missing, null, 2),
      },
    ],
  };
}