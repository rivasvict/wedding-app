(() => {
  const $mainContainer = $('.main-container');
  $mainContainer.load('app/landing.html', () => {

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

  });
})();
