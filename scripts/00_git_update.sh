#!/bin/bash

set -e

echo "===== Git Add ====="
git add .

echo "===== Git Commit ====="
git commit -m "update"

echo "===== Git Push ====="
git push

echo "===== UPDATE SUCCESS ====="