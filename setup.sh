#!/bin/bash

# This script is just meant to be used at the very first
# setup of the project

# Install ruby
chmod +x configure-wedding-db.js
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.2
sudo ln -sf "$(which ruby2.2)" /usr/bin/ruby
sudo apt-get install ruby2.2-dev
sudo gem install rubygems-update
sudo update_rubygems
sudo gem update --system
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
mkdir src/client/styles/css
mkdir src/client/precompiled-dist
mkdir src/client/dist
