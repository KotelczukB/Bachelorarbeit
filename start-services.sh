#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

echo "### Starting router ..."
docker-compose up --build -d router
echo

echo "### Starting app ..."
docker-compose up --build -d app
echo

echo "### Starting chat ..."
docker-compose up --build -d chat
echo

echo "### Starting backend ..."
docker-compose up --build -d backend
echo

echo "### Starting client ..."
docker-compose up --build -d client
echo

echo "### Starting nginx ..."
docker-compose up --build -d nginx
echo

echo "### Starting certbot ..."
docker-compose up --build -d certbot
echo
