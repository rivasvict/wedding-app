'use strict';

const express           = require('express');
const app               = express();
const PORT              = 3000;
const invitationRoute   = require('./routes/pool/invitation.js');
const commentRoute      = require('./routes/pool/comments.js');
const bodyParser        = require('body-parser'); 
const Response          = require('./util/responseData.js');
const response          = new Response();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(invitationRoute(express));
app.use(commentRoute(express));

app.use('/api/*', response.afterGetRoute.bind(response));

app.listen(PORT, () => {
  console.log('Express running  on port: ' + PORT);
});
