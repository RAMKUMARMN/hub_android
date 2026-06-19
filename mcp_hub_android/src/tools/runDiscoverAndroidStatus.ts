import { discoverAndroidStatusHandler } from "./discoverAndroidStatus.js";

(async () => {
  try {
    const res = await discoverAndroidStatusHandler();
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();