'use strict';

const express           = require('express');
const app               = express();
const PORT              = 3000;
const invitationRoute   = require('./routes/pool/invitation.js');
const bodyParser        = require('body-parser'); 

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(invitationRoute(express));

app.listen(PORT, () => {
  console.log('Express running  on port: ' + PORT);
});
