/**
 * Writes src/siteLastUpdated.json from the latest git commit date (repo root).
 * Runs via prestart/prebuild so the footer can show last update without a runtime API.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const outPath = path.join(__dirname, '../src/siteLastUpdated.json');

let iso;
try {
  iso = execSync('git log -1 --format=%cI', { encoding: 'utf8', cwd: repoRoot }).trim();
} catch {
  iso = new Date().toISOString();
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify({ lastCommitIso: iso }, null, 2)}\n`);
