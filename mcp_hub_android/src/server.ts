import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { discoverAndroidStatusHandler } from "./tools/discoverAndroidStatus.js";
import { discoverProjectFilesHandler } from "./tools/discoverProjectFiles.js";
import { discoverDocumentationHandler } from "./tools/discoverDocumentation.js";
import { discoverMissingComponentsHandler } from "./tools/discoverMissingComponents.js";
import { findFeatureHandler } from "./tools/findFeature.js";

const server = new McpServer({
  name: "hub-android-mcp",
  version: "1.0.0",
});

server.tool(
  "discover_android_status",
  "Discover Android project status",
  {},
  discoverAndroidStatusHandler
);

server.tool(
  "discover_project_files",
  "Discover Android project files",
  {},
  discoverProjectFilesHandler
);

server.tool(
  "discover_documentation",
  "Discover repository documentation",
  {},
  discoverDocumentationHandler
);

server.tool(
  "discover_missing_components",
  "Discover missing Android components",
  {},
  discoverMissingComponentsHandler
);

server.tool(
  "find_feature",
  "Find Android feature files",
  {
    feature: z.string(),
  },
  findFeatureHandler
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("Hub Android MCP Server Running...");
}

main().catch(console.error);