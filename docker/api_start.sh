#!/bin/bash

# It is needed on dev env to use npm from node_modules
if [ "${NODE_ENV}" = "development" ]; then
  export PATH="/opt/node_modules/.bin:$PATH"
fi

# Install packages
if [ "${NODE_ENV}" = "production" ]; then
    echo "Not installing packages"
else
    echo "Install all packages..."
    npm install
fi


if [ "${NODE_ENV}" = "production" ]; then
    echo "Nest start prod app..."
    COMMAND="npm start:prod:$SERVICE_NAME"
    # execute the command
    $COMMAND
else
    echo "Nest start..."
    npm start --debug --watch $SERVICE_NAME
fi
