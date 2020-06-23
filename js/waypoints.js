var $dipper = $('.dipper');

$dipper.waypoint(function (direction) {
  if (direction == 'down') {
    $dipper.addClass('js-comfort-animate');
  } else {
    $dipper.removeClass('js-comfort-animate');
  }
}, { offset: '50%' });
