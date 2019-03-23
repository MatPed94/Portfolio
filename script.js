$(window).scroll(function() {
  if ($(document).scrollTop() > 100) {
    $('.navbar').addClass('nav-change');
    $('.navbar').addClass('navbar-light');
    $('.navbar').removeClass('bg-transparent');
    $('.navbar').removeClass('navbar-dark');
  } else {
    $('.navbar').addClass('navbar-dark');
    $('.navbar').addClass('bg-transparent')
    $('.navbar').removeClass('nav-change');
    $('.navbar').removeClass('navbar-light');
  }
});

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
const subHeader = 'h2#subHeader';

function changeSubHeader(elementPath, newText){
  $(elementPath).fadeOut(1000, function() {
      $(this).text(newText.innerText).fadeIn(1000);
  });
}

const xpArray = $('ul#xp li');
let curSubHeaderItem = 0;

const intervalID = setInterval(function() {
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

/* Dynamic background */
$(window).scroll(function() {
  const distanceFromTop = $(window).scrollTop()
  console.log(distanceFromTop);

  $('#headerBackground').css({'transform' : 'translateY(' + distanceFromTop*0.33 + 'px)'});
});


/* Trigger animation chain */
$(window).scroll(function() {
  const distanceFromTop = $(window).scrollTop();
  const canvasSize = $('#canvas').height();
  const canvasPos =  $('#canvas').offset().top;

  const trigger = canvasPos - canvasSize;

  if (distanceFromTop > trigger) {
    $('#canvas img').addClass('animate');
  } else {
    $('#canvas img').removeClass('animate');
  }
});
