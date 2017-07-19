'use strict';

const routes = require('./../main.js');
const Response = require('./../../util/responseData.js');
const response = new Response();

const emailRoutes = express => {
  const router               = express.Router();
  const emailRoutes          = routes.email;
  const emailController      = new emailRoutes.controller();
  const emailRoutesBaseUri   = emailRoutes.baseUri;

  const sendInvitations = (req, res) => {
    emailController.sendInvitations()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        console.log(error.stack);
        response.error(res, error);
      });
  }

  router.post(emailRoutesBaseUri + 'sendInvitations', sendInvitations);

  return router;
}

module.exports = emailRoutes;
