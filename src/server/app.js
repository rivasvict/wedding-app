'use strict';

const express           = require('express');
const app               = express();
const PORT              = 3000;
const invitationRoute   = require('./routes/pool/invitation.js');

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(invitationRoute(express));

app.listen(PORT, () => {
  console.log('Express running  on port: ' + PORT);
});
