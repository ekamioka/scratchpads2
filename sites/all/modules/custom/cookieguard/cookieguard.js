(function($){
  // Override
  var cookieHeight = 0;
  $.cookieguard.displayMessage = function(showDelay, hideDelay){
    $.cookieguard.createCSS();
    cookieHeight = $('#cookieGuardMsg').outerHeight();
    $('#cookieGuardMsg').css('top', -cookieHeight);
    $('#cookieGuardMsg').delay(showDelay).show().animate({'top': 0}, $.cookieguard.settings.slideSpeed);
    $('#toolbar').delay(showDelay).animate({'top': cookieHeight}, $.cookieguard.settings.slideSpeed);
    $('body').delay(showDelay).animate({'paddingTop': cookieHeight + parseInt($('body').css('paddingTop'))}, $.cookieguard.settings.slideSpeed);
  };
  // Override
  $.cookieguard.hideMessage = function(hideDelay){
    if(Drupal.overlay){
      $('body').css({'paddingTop': parseInt($('body').css('paddingTop')) - cookieHeight});
      $('#toolbar').css({'top': 0});
      $('#cookieGuardMsg').remove();
      Drupal.overlay.eventhandlerAlterDisplacedElements();
    } else {
      $('body').delay(hideDelay).animate({'paddingTop': parseInt($('body').css('paddingTop')) - cookieHeight}, $.cookieguard.settings.slideSpeed);
      $('#toolbar').delay(hideDelay).animate({'top': 0}, $.cookieguard.settings.slideSpeed);
      $('#cookieGuardMsg').delay(hideDelay).animate({'top': - cookieHeight}, $.cookieguard.settings.slideSpeed, null, function(){
        $('#cookieGuardMsg').remove();
      });
    }
  }
  $(document).ready(function(){
    $.cookieguard();
    if(Drupal.settings.cookieguard) {
      for( var i in Drupal.settings.cookieguard) {
        $.cookieguard.cookies.add(Drupal.settings.cookieguard[i]['name'], Drupal.settings.cookieguard[i]['keys'], Drupal.settings.cookieguard[i]['description'], Drupal.settings.cookieguard[i]['essential']);
      }
    }
    $.cookieguard.run();
    setTimeout(function(){
      $('#denyCookies').click(function(){
        $.cookieguard.cookies.create($.cookieguard.settings.cookiePrefix + 'initialised', '2', 365);
      });
    }, $.cookieguard.settings.cookieDeleteDelay + 20);
  });
})(jQuery);
