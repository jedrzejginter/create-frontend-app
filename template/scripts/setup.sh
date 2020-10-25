#!/bin/sh -e
CDIR=$(cd -P $(dirname "${BASH_SOURCE[0]}") && pwd)

pushd ${CDIR}/.. > /dev/null
  if [ ! -f ".env" ]; then
    cp .env.example .env
  fi

  yarn
  yarn build:tailwind
popd > /dev/null
