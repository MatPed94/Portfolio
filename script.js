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
$('.collapse').on('show.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  toggleTitle(collapseId);
  changeToggleCol();
});

$('.collapse').on('hide.bs.collapse', function () {
  let collapseId = $(this).attr('id');

  scrollBack(collapseId);
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

/* Function for scroll back to the top of the content on collapse hide */
const scrollBack = function(id) {
  const parent = $('#'+id)[0].parentElement.parentElement.parentElement.parentElement;
  const parerntId = '#'+$(parent).attr('id');

  $('html, body').animate({scrollTop: $(parerntId).offset().top - 50});
}

/* Move #collapseContentThree toggle a element column on show and hide */
const changeToggleCol = function() {
  const element = $('#collapseContentThree')[0];
  const sipling = $(element.nextElementSibling)[0];
  const siplingChild = $(sipling.children)[0];

  if (!(element.classList.value.includes('show'))) {
    $(siplingChild).removeClass('col-md-8').addClass('col-md-12');
  } else {
    $(siplingChild).removeClass('col-md-12').addClass('col-md-8');
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
