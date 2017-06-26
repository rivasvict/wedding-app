'use strict';

const routes = require('./../main.js');

const invitationRoutes = express => {
  const router                    = express.Router();
  const invitationRoutes          = routes.invitation;
  const InvitationController      = new invitationRoutes.controller();
  const invitationRoutesBaseUri   = invitationRoutes.baseUri;

  const invitationHandler = (req, res) => {
    res.send(InvitationController.test(req.params.token));
  }

  router.get(invitationRoutesBaseUri + ':token', invitationHandler);

  return router;
}

module.exports = invitationRoutes;
