(() => {
  const CommentController = require('./../modules/Comment.js');

  class Invitation {
    constructor({ invitationId }) {
      this.invitationId = invitationId;
      this.comment = '';
      this.controller = new CommentController({ invitationId });
    }

    fetchComment() {
      return new Promise((resolve, reject) => {
        this.controller.getCommentByInvitationId()
          .then(response => {
            this.comment = response.data.data;
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    getComment() {
      return this.comment;
    }

    setComment(comment) {
      this.comment = comment;
    }

    postComment(comment) {
      return new Promise((resolve, reject) => {
        this.controller.postComment(comment)
          .then(response => {
            this.synchrinizeCommentWithLocal(comment);
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    synchrinizeCommentWithLocal(comment) {
      this.setCommentToDefaultState();
      this.updateCommentLocally(comment);
    }

    setCommentToDefaultState() {
      this.comment = '';
    }

    updateCommentLocally(comment) {
      this.guests = comment;
    }

  }

  module.exports = Invitation;
})();
