/* FUNCTIONALITY FOR IST.RIT.EDU SITE
AUTHOR: JASON KIRSHNER */

// Timeout in order to wait for the api data to be displayed on the DOM
setTimeout(function(){
  // Highlight animation for UNDERGRADUATE
  $('#undergrad .deg').hover(function(){
    $(this).filter(':not(:animated)').animate({
      backgroundColor: '#ff843c'
    },'slow');
  }, function(){
    $(this).animate({
      backgroundColor: '#D3C9BB'
    },'slow');
  });

  // Highlight animation for GRADUATE
  $('#grad .deg').hover(function(){
    $(this).filter(':not(:animated)').animate({
      backgroundColor: '#D3C9BB'
    },'slow');
  }, function(){
    $(this).animate({
      backgroundColor: '#ff843c'
    },'slow');
  });

  // Highlight animation for Area of Interest
  $('.area').hover(function(){
    $(this).filter(':not(:animated)').animate({
      opacity: '.8'
    },'slow');
  }, function(){
    $(this).animate({
      opacity:'1'
    },'slow');
  });

  // Highlight animation for UNDERGRADUATE MINORS
  $('.minor').hover(function(){
    $(this).filter(':not(:animated)').animate({
      opacity: '.8'
    },'slow');
  }, function(){
    $(this).animate({
      opacity:'1'
    },'slow');
  });

  // Highlight animation for COOP TABLE and EMPLOYMENT TABLE
  $('.table').hover(function(){
    $(this).filter(':not(:animated)').animate({
      opacity: '.8'
    },'slow');
  }, function(){
    $(this).animate({
      opacity:'1'
    },'slow');
  });

  // Highlight animation for FACULTY RESEARCH MEMBERS
  $('.facmem').hover(function(){
    $(this).filter(':not(:animated)').animate({
      backgroundColor: 'black',
      opacity: '0.8'
    });
    $(this).find('h5').css({"display": "inline-block", "background-color": "#ff843c", "text-align": "center"});
  }, function(){
    $(this).find('h5').css("display", "none");
    $(this).animate({
      backgroundColor: 'black',
      opacity: '1'
    });
  });

  /** EXCEPTIONAL **/
  // Highlight animation for FACULTY
  // randomizeColor is the 5th plugin including the map
  // this function generates random background colors on hover for FACULTY
  $('.faculty').randomizeColor({
            speed : 300,
            // OR "fast", "slow", ...
            property : "backgroundColor",
            // OR "color" or "all"
            infinite : false
            //If don't want to stop changing while mouse is over
        });
  $('.staff').randomizeColor({
            speed : 300,
            property : "backgroundColor",
            infinite : false
        });
}, 900);

// Once the document has loaded execute these functions
$(document).ready(function(){
  // Call to a function that detects the client's version of IE if IE is used
  detectIE();

  // prepends slicknav plugin to parent div
  $('#menu').slicknav({
    prependTo: '.button-holder'
  });

  // Window Scroll Reveal plugin object creation
  window.sr = ScrollReveal({reset: true});
  sr.reveal('.space', {duration: 900});

  // Anchor Scroll plugin assignment
  $('.anchor-scroll').anchorScroll({
    scrollSpeed: 800, // scroll speed
    offsetTop: 50 // offset for fixed top bars (defaults to 0)
  });
});

// Detect IE version on DOM load
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
      // IE 10 or older
    var v = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    if(v <= 10){
      var x = '<div class="ie-div"><h1>Your browser is out of date and is unable to load this webpage, please click the link below to obtain access to recommended browsers.</h1>';
      x+='<h2><a href="http://outdatedbrowser.com/en">Browsers</a></h2></div>';
      $('body').empty();
      $('body').html(x);
      $('.ie-div').css({
        "height": "200px",
        "width": "50%",
        "text-align": "center",
        "margin": "auto",
        "background-color": "#f1f1f1",
        "font-weight": "bolder"
      });
      $('.ie-div a').css("text-decoration", "none");
    }
  }
}
