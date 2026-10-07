#!/usr/bin/env bash
# The Codespace's "publish" for code: one command, so Claude's permission check sees one
# allowed action instead of a chain it has to judge piece by piece.
#   scripts/publish.sh "<Name>: <what changed, which page>"
# Runs on the person's branch after `npm run build` passed and they said "publish":
# merges the latest main in, pushes, opens the pull request, squash-merges it,
# deletes the branch, and leaves the Codespace on an up-to-date main.
set -euo pipefail
title="${1:-}"
[ -n "$title" ] || { echo 'usage: scripts/publish.sh "<Name>: <what changed, which page>"'; exit 1; }
branch="$(git branch --show-current)"
[ "$branch" != "main" ] || { echo "you're on main — make the change on a branch first"; exit 1; }
[ -z "$(git status --short)" ] || { echo "unsaved edits on $branch — commit them first"; exit 1; }
git fetch origin --prune
git merge --no-edit origin/main
git push -u origin "$branch"
pr="$(gh pr list --head "$branch" --state open --json number --jq '.[0].number' 2>/dev/null || true)"
if [ -z "$pr" ]; then
  gh pr create --base main --head "$branch" --title "$title" --body "$title

Published from the shared website Codespace."
fi
gh pr merge "$branch" --squash --delete-branch --subject "$title"
git checkout main
git pull --ff-only origin main
echo "published: $title"
echo "the test site rebuilds in about two minutes"
