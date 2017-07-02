'use strict';

const routes = require('./../main.js');
const Response = require('./../../util/responseData.js');
const response = new Response();

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
        response.error(res, error);
      });
  }

  const getGuestsNamesBasedOnInvitation = (req, res, next) => {
    const invitationId = req.params.invitationId;
    invitationController.getGuestsBasedOnInvitation(invitationId)
      .then(guests => response.byMiddleware(next, res, guests))
      .catch(error => response.error(res, error));
  }

  const getNumberOfConfirmedGuests = (req, res, next) => {
    invitationController.getNumberOfConfirmedGuests()
      .then(numberOfConfirmedGuest => response.byMiddleware(next, res, numberOfConfirmedGuest))
      .catch(error => response.error(res, error));
  }

  router.post(invitationRoutesBaseUri + 'confirm', confirmInvitation);
  router.get(invitationRoutesBaseUri + 'getGuests/:invitationId', getGuestsNamesBasedOnInvitation);
  router.get(invitationRoutesBaseUri + 'getNumberOfConfirmedGuests', getNumberOfConfirmedGuests);

  return router;
}

module.exports = invitationRoutes;
