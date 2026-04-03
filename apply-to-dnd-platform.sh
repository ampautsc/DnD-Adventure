#!/usr/bin/env bash
# apply-to-dnd-platform.sh
#
# Applies the context-engineering import patch to your local dnd-platform repo.
#
# Usage:
#   cd /path/to/dnd-platform
#   bash /path/to/DnD-Adventure/apply-to-dnd-platform.sh
#
# What this does:
#   1. Creates branch copilot/import-context-engineering off master
#   2. Applies the patch (skills/context-building + npc-context XML + tests)
#   3. Prints next steps

set -e

PATCH_FILE="$(cd "$(dirname "$0")" && pwd)/dnd-platform-import.patch"

if [ ! -f "$PATCH_FILE" ]; then
  echo "ERROR: Patch file not found at: $PATCH_FILE"
  exit 1
fi

if [ ! -f "package.json" ] || ! grep -q "dnd-platform" package.json 2>/dev/null; then
  echo "ERROR: Run this script from the root of the dnd-platform repo."
  exit 1
fi

echo "Creating branch copilot/import-context-engineering..."
git checkout master
git pull origin master
git checkout -b copilot/import-context-engineering

echo "Applying patch..."
git am --3way "$PATCH_FILE"

echo ""
echo "Done. Branch copilot/import-context-engineering is ready."
echo ""
echo "Next steps:"
echo "  git push origin copilot/import-context-engineering"
echo "  # Then open a PR on GitHub: ampautsc/dnd-platform"
echo ""
echo "To verify the 61 tests pass:"
echo "  node --test packages/dm/__tests__/prompts/npcContext.test.js"
