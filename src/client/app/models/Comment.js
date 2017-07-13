'use-strict';
(() => {
  const Connection = require('./../modules/connection.js');
  const endpointBases = require('./../modules/endpointBases.js');
  const base = endpointBases.invitation;

  class Comment extends Connection {
    constructor({ invitationId }) {
      super(endpointBases.comment);
      this.invitationId = invitationId;
    }

    getCommentByInvitationId() {
      return this.get(`invitation/getCommentByInvitationId/${this.invitationId}`);
    }

    postComment(comment) {
      return this.post(`comment/postComment`, {
        comment,
        invitationId: this.invitationId,
      });
    }
  }

  module.exports = Comment;

  /*
  const myNewComment = new Comment({
    invitationId: 'weijd12'
  });

   * USAGE
  myNewComment.getCommentByInvitationId()
    .then(guestResponse => console.log(commentResponse))
    .catch(error => console.log(error));
  myNewComment.getCommentByInvitationId({
    comment: 'testComment'
  })
    .then(guestResponse => console.log(commentResponse))
    .catch(error => console.log(error));
  */
})();
