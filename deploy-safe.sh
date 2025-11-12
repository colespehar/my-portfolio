#!/bin/bash
set -e

# Ensure you're on the main branch before doing anything destructive
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "❌ You must be on main to run this script. Currently on: $BRANCH"
  exit 1
fi

# Build the project
echo "🏗️  Building project..."
npm run build

# Switch to deploy branch
echo "🚀 Switching to deploy branch..."
git switch deploy || git checkout -b deploy

# Remove everything except .git
echo "🧹 Cleaning deploy branch..."
find . -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +

# Copy build output
echo "📦 Copying built files..."
cp -R dist/* .
cp .nojekyll . 2>/dev/null || true
cp README_DEPLOY.md . 2>/dev/null || true

# Commit and push
echo "📤 Deploying to GitHub..."
git add -A
git commit -m "deploy: fresh build for Porkbun" || echo "No changes to commit."
git push origin deploy --force

# Return to main
echo "🔄 Switching back to main..."
git switch main

echo "✅ Deployment complete!"