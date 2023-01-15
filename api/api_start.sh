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

# Run migrations only in one service
if [ "${SERVICE_NAME}" = "api_store" ]; then
  echo "Run database migrations..."
  export NODE_ENV=$NODE_ENV;
  echo $NODE_ENV
  npx sequelize-cli db:migrate
fi


if [ "${NODE_ENV}" = "production" ]; then
    echo "Nest start prod app..."
    COMMAND="npm start:prod:$SERVICE_NAME"
    # execute the command
    $COMMAND
else
    echo "Nest start..." $SERVICE_NAME
    nest start --watch $SERVICE_NAME
fi
