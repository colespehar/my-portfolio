// cleanup-dupes.js
// ✅ Smart version: only runs if duplicates exist

import { readdirSync, rmSync, statSync } from "fs";
import { join } from "path";
import process from "process";

let deletedFiles = 0;
let deletedFolders = 0;
let foundDupes = false;

function cleanDir(dir) {
	const files = readdirSync(dir);
	for (const file of files) {
		const fullPath = join(dir, file);
		const stats = statSync(fullPath);

		if (stats.isDirectory()) {
			if (["node_modules", "dist", ".git"].includes(file)) continue;
			cleanDir(fullPath);

			const remaining = readdirSync(fullPath);
			if (remaining.length === 0) {
				rmSync(fullPath, { recursive: true, force: true });
				deletedFolders++;
				console.log(`📂 Removed empty folder: ${fullPath}`);
			}
		} else if (/\s[0-9]+\.[^.]+$|-[0-9]+\.[^.]+$/.test(file)) {
			foundDupes = true;
			try {
				rmSync(fullPath);
				deletedFiles++;
				console.log(`🗑️  Deleted duplicate: ${fullPath}`);
			} catch (err) {
				console.error(`❌ Could not delete ${fullPath}:`, err.message);
			}
		}
	}
}

console.log("🔍 Scanning for duplicates...");
cleanDir(process.cwd());

if (foundDupes) {
	console.log(
		`✅ Cleanup complete. Deleted ${deletedFiles} files, ${deletedFolders} folders.`
	);
} else {
	console.log("✨ No duplicates found — everything’s clean!");
}
