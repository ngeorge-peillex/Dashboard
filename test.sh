#!/usr/bin/env bash

set -e

docker-compose down
docker system prune -a
docker volume rm $(docker volume ls -q)

docker-compose up -d --build --force-recreate

cd prisma
alias npm-exec='PATH=$(npm bin):$PATH'
npm-exec prisma2 lift save && npm-exec prisma2 lift up
cd ..