#!/bin/sh
set -e

cd /mnt/app
rm -rf node_modules && rm -rf .nuxt && rm -rf .output

pnpm install

pnpm run generate
pnpm run dev
