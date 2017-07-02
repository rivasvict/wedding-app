'use strict';

const knex = require('./../knex.js');
const comments = 'comments';

class CommentModel {
  constructor() {
  }

  postCommentByInvitationId(comment, invitationId) {
    return knex(comments)
      .where({
        invitation_id: invitationId
      })
      .update({
        comment
      });
  }

  getCommentByInvitationId(invitationId) {
    return knex(comments)
      .where({
        invitation_id: invitationId
      });
  }

} 

module.exports = CommentModel;
