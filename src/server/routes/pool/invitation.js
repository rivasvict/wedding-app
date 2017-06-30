'use strict';

const routes = require('./../main.js');

const invitationRoutes = express => {
  const router                    = express.Router();
  const invitationRoutes          = routes.invitation;
  const invitationController      = new invitationRoutes.controller();
  const invitationRoutesBaseUri   = invitationRoutes.baseUri;

  const confirmInvitation = (req, res) => {
    const guests = JSON.parse(req.body.guests);
    invitationController.confirmGuests(guests, req.body.invitationId)
      .then(() => {
        res.status(200).send('OK');
      })
      .catch(error => {
        console.log(error.stack);
        res.status(500).send(error.stack);
      });
  }

  router.post(invitationRoutesBaseUri + 'confirm', confirmInvitation);

  return router;
}

module.exports = invitationRoutes;
