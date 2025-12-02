#!/usr/bin/env node
import { execSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const mode = process.argv[2] || "real"; // real | test1 | test2
const originalCwd = process.env.INIT_CWD || process.cwd(); // where you typed npm run
const mainPath = path.join(originalCwd, "main.ts");

// Pass ORIGINAL_CWD explicitly to main.ts
try {
  execSync(
    `npx cross-env INPUT_MODE=${mode} ORIGINAL_CWD=${originalCwd} ts-node ${mainPath}`,
    {
      stdio: "inherit",
    }
  );
} catch (err) {
  console.error(`Failed to run script for ${mainPath}:`, err instanceof Error ? err.message : String(err));
  process.exit(1);
}
