#!/bin/bash
# ─── Build Script — reads credentials from .env ───────────────────────────────
set -a
[ -f .env ] && source .env
set +a

ML_TOKEN="${MAILERLITE_TOKEN:-placeholder}"
ML_GID="${MAILERLITE_GROUP_ID:-placeholder}"

npx esbuild _preview_entry.tsx \
  --bundle \
  --outfile=_preview_bundle.js \
  --loader:.tsx=tsx \
  --loader:.ts=ts \
  --format=iife \
  --define:process.env.NODE_ENV='"development"' \
  --define:MAILERLITE_TOKEN="\"$ML_TOKEN\"" \
  --define:MAILERLITE_GROUP_ID="\"$ML_GID\""

echo "✓ Built with ML_TOKEN=$(echo $ML_TOKEN | head -c 8)..."
