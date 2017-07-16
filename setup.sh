#!/bin/bash

# This script is just meant to be used at the very first
# setup of the project

sudo apt-get -y install gem
sudo gem install sass
sudo npm install -g nvm
nvm install
nvm use
npm install --global webpack
chmod +x scripts/cleanTemporalDirectories.sh
mkdir src/client
mkdir src/client/app
mkdir src/client/styles
mkdir src/client/styles/sass
mkdir src/client/precompiled-dist
mkdir src/client/dist
