#!/bin/sh -e

rm -rf out

rm -rf template/.next
rm -rf template/out
rm -rf template/node_modules

echo 'Build project structure'
cp -R template out
node build.js

echo 'Codemod'
node codemod.js out/src/pages/Home/Home.tsx

echo 'Check if project is generated correctly'
cd out

if [ -f ".env" ]; then
  cp .env.example .env
fi

yarn
yarn lint --fix
yarn typecheck

# Back to root dir
cd ..

echo 'Run tests'
yarn test
