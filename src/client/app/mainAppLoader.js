(() => {
  const queryString = require('query-string');
  const ConfirmationHandler = require('./modules/markupControllers/confirmation.js')
  const $mainContainer = $('.main-container');
  const Invitation = require('./models/Invitation.js');
  const MarkupHandlerForComment = require('./modules/markupControllers/comment.js');
  const Comment = require('./models/Comment.js');
  const LoaderSpinner = require('./modules/LoaderSpinner.js');
  require('jquery-serializejson');

  const urlParams = queryString.parse(location.search);
  const invitationId = urlParams.invitationId;
  const invitationIdClassReady = {
    invitationId
  }

  const currentInvitation = new Invitation(invitationIdClassReady);
  const comment = new Comment(invitationIdClassReady);

  const loaderSpinner = new LoaderSpinner("Cargando...");
  loaderSpinner.turnOn();

  currentInvitation.fetchGuests()
    .then(response => {
      if (response.data.data.length) {
        renderContentForAuthorizedGuest(currentInvitation);
      } else {
        alert('Doing nasty stuff eh!');
      }
      loaderSpinner.turnOff();
    })
    .catch(error => {
      loaderSpinner.turnOff();
      console.log(error);
    });

  const renderContentForAuthorizedGuest = (invitation) => {
      $mainContainer.load('app/landing.html', () => {

        const activateOffsetForMainNavigation = () => {
          $('#mainNav').affix({
              offset: {
                  top: 100
              }
          })
        }

        const innitializeMagnificPopupPlugin = () => {
          $('.popup-gallery').magnificPopup({
              delegate: 'a',
              type: 'image',
              tLoading: 'Loading image #%curr%...',
              mainClass: 'mfp-img-mobile',
              gallery: {
                  enabled: true,
                  navigateByImgClick: true,
                  preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
              },
              image: {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
              }
          });
        }

        const initializeCommentBox = () => {
          const commentHandler = new MarkupHandlerForComment({
            model: comment
          });
        }

        const activateJsFunctionality = () => {
          initializePlugins();
          initializeCustomBehavior();
          initializeCommentBox();
          initializeParallax();
        }

        const initializePlugins = () => {
          activateOffsetForMainNavigation();
          innitializeMagnificPopupPlugin();
        }

        const initializeCustomBehavior = () => {
          initializeConfirmationFunctionality();
        }

        const initializeConfirmationFunctionality = () => {
          new ConfirmationHandler({ model: invitation });
        }
        
        const initializeParallax = () => {
          $('.parallax-window').parallax({
            imageSrc: 'assets/img/parallax1.jpg'
          });
        }

        activateJsFunctionality();

    });
  }
})();
