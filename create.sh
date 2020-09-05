#!/bin/sh -e

echo 'Build project structure'
node build.js

echo 'Codemod'
node codemod.js out/src/pages/Home/Home.tsx

echo 'Check if project is generated correctly'
cd out
yarn
yarn lint --fix
yarn typecheck

echo 'Run tests'
cd ..
yarn test
