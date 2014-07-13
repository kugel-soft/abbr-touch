/*! touchtap-event.js | (c) 2014 Daniel Imms | github.com/Tyriar/touchtap-event.js/blob/master/LICENSE */

(function () {
  'use strict';

  var event;
  var isTapLength;
  var tapLengthTimeout;
  var startPosition   = { x: -1, y: -1 };
  var currentPosition = { x: -1, y: -1 };

  function init () {
    event = new Event('touchtap');
    document.addEventListener('touchstart', touchstart);
    document.addEventListener('touchend', touchend);
    document.addEventListener('touchcancel', touchend);
    document.addEventListener('touchmove', touchmove);
  }

  function touchstart(e) {
    var pointerEvent = getPointerEvent(e);
    startPosition.x = pointerEvent.pageX;
    startPosition.y = pointerEvent.pageY;
    currentPosition.x = pointerEvent.pageX;
    currentPosition.y = pointerEvent.pageY;
    isTapLength = true;
    if (tapLengthTimeout) {
      clearTimeout(tapLengthTimeout);
    }
    tapLengthTimeout = setTimeout(function () {
      isTapLength = false;
    }, 200);
  }

  function touchend(e) {
    if (isTapLength &&
        approximatelyEqual(startPosition.x, currentPosition.x) &&
        approximatelyEqual(startPosition.y, currentPosition.y)) {
      e.target.dispatchEvent(event, {
        'target': e.target
      });
    }
  }

  function touchmove(e) {
    var pointerEvent = getPointerEvent(e);
    currentPosition.x = pointerEvent.pageX;
    currentPosition.y = pointerEvent.pageY;
  }

  function approximatelyEqual(a, b) {
    return Math.abs(a - b) < 2;
  }

  function getPointerEvent(e) {
    if (e.originalEvent && e.originalEvent.targetTouches) {
      return e.originalEvent.targetTouches[0];
    }
    if (e.targetTouches) {
      return e.targetTouches[0];
    }
    return e;
  }

  init();
})();

/*! abbr-touch.js | (c) 2014 Daniel Imms | github.com/Tyriar/abbr-touch.js/blob/master/LICENSE */

var abbrTouch = (function () {
  'use strict';

  function init () {
    var elements = document.querySelectorAll('abbr[title]');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchtap', tap);
    }
  }

  function tap(e) {
    alert(e.target.title);
  }

  return init;
})();