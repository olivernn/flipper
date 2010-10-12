(function($){
  jQuery.fn.flipper = function(options){

    var defaults = {
      'container': '.container',
      'perspective': '800',
      'duration': '2',
      'axis': 'Y',
      'turns': 0,
      'callback': jQuery.noop
    };

    var settings = jQuery.extend({}, defaults, options);
    var rotation = (180 + (360 * settings.turns));
    var transformation = 'rotate' + settings.axis + '(' + rotation + 'deg)';
    var duration = settings.duration + 's'

    var $container = jQuery(this).parent(settings.container);
    var $flipper = jQuery(this);
    var $front = jQuery(this).find('.front');
    var $back = jQuery(this).find('.back');
    var $target;

    settings.target ? $target = jQuery(settings.target) : $target = $flipper;

    $container.css({
      '-webkit-perspective': settings.perspective
    });

    $flipper.css({
      '-webkit-transform-style': 'preserve-3d',
      '-webkit-transition-property': '-webkit-transform',
      '-webkit-transition-duration': duration
    });

    $flipper.get(0).addEventListener('webkitTransitionEnd', function () {
      settings.callback({onTop: $front.hasClass('on-top') ? 'front' : 'back'})
    }, false );

    $flipper
      .bind('enable', function () {
        $target.bind('click', clickHandler);
      })
      .bind('disable', function () {
        $target.unbind('click', clickHandler);
      })
      .bind('flip', function () {
        $target.trigger('click');
      });

    $front.addClass('on-top');
    $back.addClass('on-bottom');

    $front.css({
      'position': 'absolute',
      '-webkit-backface-visibility': 'hidden'
    });

    $back.css({
      'position': 'absolute',
      '-webkit-backface-visibility': 'hidden',
      '-webkit-transform': transformation
    });

    var clickHandler = function () {
      $flipper.css({
        '-webkit-transform': $flipper.find('.on-top').hasClass('front') ? transformation : ''
      });
      toggleTopBottomClass();
    }

    $target.click(clickHandler)

    function disable () {
      $target.unbind('click');
    };

    function toggleTopBottomClass () {
      $front.toggleClass('on-top on-bottom');
      $back.toggleClass('on-top on-bottom');
    };

    return this;
  };
})(jQuery);