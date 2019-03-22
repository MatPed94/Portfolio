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
}, 6000);

/* Enable Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});