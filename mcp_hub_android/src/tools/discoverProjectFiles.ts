import fs from "fs";
import { HUB_ANDROID_PATH } from "../config.js";

export async function discoverProjectFilesHandler() {
  const files = fs.readdirSync(HUB_ANDROID_PATH);

  const projectFiles = files.filter(
    file =>
      file.endsWith(".gradle") ||
      file.endsWith(".gradle.kts") ||
      file === "gradlew" ||
      file === "gradlew.bat" ||
      file === "AndroidManifest.xml"
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(projectFiles, null, 2),
      },
    ],
  };
}