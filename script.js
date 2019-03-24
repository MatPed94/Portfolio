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
$('#collapseContentOne').on('hide.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[0].innerText = 'Vis mere.'
});

$('#collapseContentOne').on('show.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[0].innerText = 'Vis mindre.'
});

$('#collapseContentTwo').on('hide.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[1].innerText = 'Vis mere.'
});

$('#collapseContentTwo').on('show.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[1].innerText = 'Vis mindre.'
});

$('#collapseContentThree').on('hide.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[2].innerText = 'Vis mere.'
});

$('#collapseContentThree').on('show.bs.collapse', function () {
  $('a[data-toggle="collapse"]')[2].innerText = 'Vis mindre.'
});

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
