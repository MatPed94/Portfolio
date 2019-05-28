/* Init scroll dependent functions */
$(window).scroll(function(){
  const distancefromTop = $(window).scrollTop();

  navbarChange(distancefromTop, 120);
  headerParallax(distancefromTop);
  startAnimation(distancefromTop);
});

/* --Scroll function section-- */

/* Change navbar scrolling from top */
const navbarChange = function(distance, trigger) {
  const navbar = '.navbar';
  if (distance > trigger) {
    $(navbar).removeClass('bg-transparent navbar-dark').addClass('nav-change navbar-light');
  } else {
    $(navbar).removeClass('nav-change navbar-light').addClass('navbar-dark bg-transparent');
  }
}

/* Dynamic background */
const headerParallax = function(distance) {
  $('#headerBackground').css({'transform' : 'translateY(' + distance * 0.3 + 'px)'});
}

/* Trigger animation chain */
const startAnimation = function(distance) {
  const canvasSize = $('#canvas').height();
  const canvasPos =  $('#canvas').offset().top;
  const windowHeight = $(window).height();

  const trigger = (canvasPos - canvasSize);

  if (distance > trigger) {
    $('#canvas img').addClass('animate');
  } else if(distance < (trigger - windowHeight)) {
    $('#canvas img').removeClass('animate');
  }
}

/* --End of scroll function section-- */

/* Collapse usability */
/* Function for scroll back to the top of the content on collapse hide on a element click */
$('a[data-toggle="collapse"]').click(function() {
  const collapseId = $(this).attr('href');

  const topParent = $(collapseId).parents('.portfolio-content');
  const parerntId = '#'+$(topParent).attr('id');

  if($(collapseId)[0].classList.value.includes('show')) {
    $('html, body').animate({scrollTop: $(parerntId).offset().top - 50});
  }
});

/* Executes functions on collapse show */
$('.collapse').on('show.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  loadCollapseIframes(collapseId);
  loadCollapseImages(collapseId);

  toggleTitle(collapseId);
  changeToggleCol();
});

/* Executes functions on collapse hide */
$('.collapse').on('hide.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  toggleTitle(collapseId);
  changeToggleCol();
});

/* Changes the title of the a element based on the collapse show and hide */
const toggleTitle = function(id) {
  let curCollapse = $('a[href*="' + id + '"]');

  if (curCollapse.text() === 'Vis mere.') {
    curCollapse.text( 'Vis mindre.' );
  } else {
    curCollapse.text( 'Vis mere.' );
  }
}

/* Move #collapseContentTwo toggle a element column on show and hide */
const changeToggleCol = function() {
  const tag = $('.content-scale');
  const content = $('#collapseContentTwo');

  if (tag.hasClass('col-lg-12')) {
    tag.addClass('col-lg-8').removeClass('col-lg-12');
  } else {
    tag.addClass('col-lg-12').removeClass('col-lg-8');
  }
}

/* Activate scrollspy menu */
$('body').scrollspy({
  target: '#navbarNav',
  offset: 50
});

/* Subheader cycle */
function changeSubHeader(elementPath, newText){
  $(elementPath).fadeOut(1000, function() {
      $(this).text(newText.innerText).fadeIn(1000);
  });
}

let curSubHeaderItem = 0;

const intervalID = setInterval(function() {
  const subHeader = 'h2#subHeader';
  const xpArray = $('ul#xp li');

  curSubHeaderItem++;

    if (curSubHeaderItem >= xpArray.length) {
        curSubHeaderItem = 0;
    }
    changeSubHeader(subHeader, xpArray[curSubHeaderItem]);
}, 5000);

/* Enable Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

/* Submit functionality */

$('#contactForm').submit(function(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const self = $(this);
  const sendButton = $('#sendMessageButton');
  sendButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').prop("disabled", true); // Disable send button while Ajax call is running

  // Get data from form
  const name = $('input[name="name"]').val(),
        email = $('input[name="email"]').val(),
        phone = $('input[name="phone"]').val(),
        message = $('textarea[name="message"]').val();

  $.ajax({
    url: 'mail/contact-me.php',
    method: 'POST',
    data: {
      name: name,
      email: email,
      phone: phone,
      message: message
    },
    cache: false,
    success: function() {
      $('#messageSuccess').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Tak for beskeden.</strong> Jeg vender tilbage til dig snarest muligt.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      
      $('#contactForm').removeClass('was-validated');
      self.trigger('reset'); // Clear form fields
    },
    error: function() {
      if (warningHandler()) {
        $('#messageDanger').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Noget gik galt.</strong> Prøv igen på et senere tidspunkt.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      } else {
        warningHandler();
        $('#contactForm').addClass('was-validated');
      }
    },
    complete: function() {
      setTimeout(function() {
        sendButton.html('Send').prop("disabled", false); // Re-enable submit button when AJAX call is complete
      }, 1000);
    }
  });
});

/* When clicking on Full hide fail/success boxes */
$('*[name]').focus(function() {
  $('.alert').alert('close');
});

/* Warning when leaving required fields */
$('#contactForm *[required]').blur(function() {
  warningHandler();
});

/* Warning on empty required fields */
const warningHandler = function() {
  const required = $('#contactForm *[required]'),
        titles = [];

  for (let i = 0; i < required.length; i++) {
    const el = $(required[i]),
          title = el.siblings('label').text();
    
    if (!(el.val())) {
      titles.push(title);
    }
  }
  if (titles.length === 1) {
    $('#messageWarning').html('<div id="messageWarning" class="alert alert-warning alert-dismissible fade show" role="alert">Undfyld venligst <strong>' + titles.toString().toLowerCase() + '</strong> feltet før du sender.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
  } else if (titles.length > 0) {
    const titlesJoin = titles.join(', '),
          lastCommaIndex = titlesJoin.lastIndexOf(', '),
          titlesStr = titlesJoin.slice(0, lastCommaIndex) + titlesJoin.slice(lastCommaIndex).replace(', ', ' og ');
    $('#messageWarning').html('<div id="messageWarning" class="alert alert-warning alert-dismissible fade show" role="alert">Undfyld venligst <strong>' + titlesStr.toLowerCase() + '</strong> felterne før du sender.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
  } else {
    return true; // Returns true to use in ajax error handler when all fields er filled
  }
}

/* Lazy-load images and iframes inside collapse show */
const loadCollapseImages = function(id) {
  const collapseImg = $('#'+ id +' img');

  for (let i = 0; i < collapseImg.length; i++) {
    const el = $(collapseImg[i]),
          elDataSrc = el.attr('data-src'),
          elSrc = el.attr('src');

    if (elDataSrc && !(elSrc)) {
      el.attr('src', elDataSrc);
    }
  }
}

const loadCollapseIframes = function(id) {
  const collapseIframe = $('#'+ id +' iframe');
  
  for (let i = 0; i < collapseIframe.length; i++) {
    const el = $(collapseIframe[i]);
    const elDataSrc = el.attr('data-src');
    const elSrc = el.attr('src');
    if (elDataSrc && !(elSrc)) {
      el.attr('src', elDataSrc);
    }
  }
}