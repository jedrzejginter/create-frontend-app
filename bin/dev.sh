#!/bin/sh -e

PROJECT_DIR=out
PROJECT_NAME=myproject

rm -rf $PROJECT_DIR

SKIP_SCRIPTS=true yarn create-project -o $PROJECT_DIR -n $PROJECT_NAME
CRP_ARG_OUT=$PROJECT_DIR CRP_ARG_NAME=$PROJECT_NAME yarn test --watch
