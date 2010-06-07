(function($){
  $.fn.flipper = function(options){

    var defaults = {
      'perspective': '600',
      'duration': '2s',
      'axis': 'Y',
      'turns': 0
    }

    var settings = jQuery.extend({}, defaults, options)
    var rotation = (180 + (360 * settings.turns))
    var transformation = 'rotate' + settings.axis + '(' + rotation + 'deg)'

    var $container = $(this).parent('#container')
    var $flipper = $(this)
    var $front = $(this).find('.front')
    var $back = $(this).find('.back')

    $container.css({
      '-webkit-perspective': settings.perspective
    })

    $flipper.css({
      '-webkit-transform-style': 'preserve-3d',
      '-webkit-transition-property': '-webkit-transform',
      '-webkit-transition-duration': settings.duration
    }).toggle(function () {
      $(this).css({
        '-webkit-transform': transformation
      })
    }, function () {
      $(this).css({
        '-webkit-transform': ''
      })
    })

    $front.css({
      'position': 'absolute',
      '-webkit-backface-visibility': 'hidden'
    })

    $back.css({
      'position': 'absolute',
      '-webkit-backface-visibility': 'hidden',
      '-webkit-transform': transformation
    })

    return this;
  };
})(jQuery);