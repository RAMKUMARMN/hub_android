import fs from "fs";
import path from "path";
import { HUB_ANDROID_PATH } from "../config.js";

export async function discoverDocumentationHandler() {
  const readme = path.join(HUB_ANDROID_PATH, "README.md");
  const setupNotes = path.join(HUB_ANDROID_PATH, ".setup-notes");

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            readmeExists: fs.existsSync(readme),
            setupNotesExist: fs.existsSync(setupNotes),
          },
          null,
          2
        ),
      },
    ],
  };
}