#!/bin/sh
set -e

cd /mnt/app
rm -rf node_modules && rm -rf .nuxt && rm -rf .output

ls -la

npm i
npm run build
npm run dev -o
