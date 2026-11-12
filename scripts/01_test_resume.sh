#!/bin/bash

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8000

cd "$PROJECT_DIR"

echo "=================================="
echo " Resume Local Test Server"
echo "=================================="

# Check required files
for file in resume.html css/resume.css pics/my.png pics/summary.png; do
    if [ ! -f "$file" ]; then
        echo "[ERROR] Missing file: $file"
        exit 1
    fi
done

echo "[OK] Required files found"

# Check port
if ss -ltn | grep -q ":${PORT} "; then
    echo "[ERROR] Port ${PORT} is already in use."
    echo "Stop the existing server or change PORT in this script."
    exit 1
fi

echo "[OK] Starting local server..."
echo "URLs:"
echo "Resume : http://127.0.0.1:${PORT}/resume.html"
echo "PingBot: http://127.0.0.1:${PORT}/pingbot.html"
echo "Home   : http://127.0.0.1:${PORT}/"
echo "Press Ctrl+C to stop."
echo "=================================="

exec python3 -m http.server "$PORT" --bind 0.0.0.0
