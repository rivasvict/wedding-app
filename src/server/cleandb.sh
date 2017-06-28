#!/bin/bash

sudo -u postgres dropdb --if-exists --echo wedding_db
sudo -u postgres createdb --encoding=UTF8 wedding_db
sudo -u postgres psql postgres -c 'ALTER DATABASE wedding_db OWNER TO wedding_user_db';
