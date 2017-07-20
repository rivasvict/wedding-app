#!/bin/bash

sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql postgres -c "CREATE USER wedding_user_db WITH PASSWORD 'wedding_password_db';"
