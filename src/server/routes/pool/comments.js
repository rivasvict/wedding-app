'use strict';

const routes = require('./../main.js');
const Response = require('./../../util/responseData.js');
const response = new Response();

const commentRoutes = express => {
  const router                 = express.Router();
  const commentRoutes          = routes.comment;
  const commentController      = new commentRoutes.controller();
  const commentRoutesBaseUri   = commentRoutes.baseUri;

  const postCommentByInvitationId = (req, res) => {
    const invitationId = req.body.invitationId;
    const comment = req.body.comment;
    commentController.postCommentByInvitationId(comment, invitationId)
      .then(() => {
        res.status(200).send('OK');
      })
      .catch(error => {
        console.log(error.stack);
        response.error(res, error);
      });
  }

  const getCommentByInvitationId = (req, res, next) => {
    const invitationId = req.params.invitationId;
    commentController.getCommentByInvitationId(invitationId)
      .then(comment => response.byMiddleware(next, res, comment))
      .catch(error => response.error(res, error));
  }

  router.post(commentRoutesBaseUri + 'postComment', postCommentByInvitationId);
  router.get(commentRoutesBaseUri + 'getCommentByInvitationId/:invitationId', getCommentByInvitationId);

  return router;
}

module.exports = commentRoutes;
