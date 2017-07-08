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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(invitationRoute(express));
app.use(commentRoute(express));

app.use('/api/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/*', response.afterGetRoute.bind(response));

app.listen(PORT, () => {
  console.log('Express running  on port: ' + PORT);
});
