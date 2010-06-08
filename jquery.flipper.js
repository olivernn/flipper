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

    var $container = jQuery(this).parent('#container')
    var $flipper = jQuery(this)
    var $front = jQuery(this).find('.front')
    var $back = jQuery(this).find('.back')
    var $target

    settings.target ? $target = jQuery(settings.target) : $target = $flipper

    $container.css({
      '-webkit-perspective': settings.perspective
    })

    $flipper.css({
      '-webkit-transform-style': 'preserve-3d',
      '-webkit-transition-property': '-webkit-transform',
      '-webkit-transition-duration': settings.duration
    })

    $target.toggle(function () {
      $flipper.css({
        '-webkit-transform': transformation
      })
      return false;
    }, function () {
      $flipper.css({
        '-webkit-transform': ''
      })
      return false;
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