'use strict';

const CommentModel = require('./../../models/comment.js');

class InvitationController {
  constructor() {
    this.model = new CommentModel();
  }

  postCommentByInvitationId(comment, invitationId) {
    return this.model.postCommentByInvitationId(comment, invitationId);
  }

  getCommentByInvitationId(invitationId) {
    return this.model.getCommentByInvitationId(invitationId)
  }
}

module.exports = InvitationController;
