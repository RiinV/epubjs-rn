var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

window.onerror = function (message, file, line, col, error) {
  var msg = JSON.stringify({
    method: 'error',
    value: message
  });
  window.postMessage(msg, '*');
};

function closestMultiple(N, M) {
  var quotient = Math.floor(N / M);
  var multiple1 = M * quotient;
  var multiple2 = M * (quotient + 1);

  if (Math.abs(N - multiple1) < Math.abs(N - multiple2)) {
    return multiple1;
  }

  return multiple2;
}

(function () {
  function _ready() {
    var contents;
    var targetOrigin = '*';

    var sendMessage = function sendMessage(obj) {
      if (!window.ReactNativeWebView.postMessage) {
        setTimeout(function () {
          sendMessage(obj);
        }, 1);
      } else {
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
      }
    };

    var q = [];
    var _isReady = false;
    var touchstartX = 0;
    var touchendX = 0;
    var book;
    var rendition;
    var minSpreadWidth = 815;
    var axis = 'horizontal';
    var isChrome = /Chrome/.test(navigator.userAgent);
    var isWebkit = !isChrome && /AppleWebKit/.test(navigator.userAgent);

    console.log = function () {
      sendMessage({
        method: 'log',
        value: Array.from(arguments)
      });
    };

    console.error = function () {
      sendMessage({
        method: 'error',
        value: Array.from(arguments)
      });
    };

    function onMessage(e) {
      var message = e.data;
      handleMessage(message);
    }

    function checkDirection() {
      var RANGE_TO_SWIPE = 75;
      var _book$rendition$locat = book.rendition.location.start.displayed,
          page = _book$rendition$locat.page,
          total = _book$rendition$locat.total;

      if (touchendX < touchstartX - RANGE_TO_SWIPE) {
        if (isChrome || page === total) {
          rendition.next();
          window.scrollTo(closestMultiple(window.scrollX, 393), 0);
        }
      }

      if (touchendX > touchstartX + RANGE_TO_SWIPE) {
        if (isChrome || page === 1) {
          rendition.prev();
          window.scrollTo(closestMultiple(window.scrollX, 393), 0);
        }
      }
    }

    function handleMessage(message) {
      var decoded = typeof message == 'object' ? message : JSON.parse(message);
      var response;
      var result;

      switch (decoded.method) {
        case 'open':
          {
            var url = decoded.args[0];
            var options = decoded.args.length > 1 && decoded.args[1];
            var epubOptions = decoded.args.length > 2 && decoded.args[2];
            openEpub(url, epubOptions, options);

            if (options && options.webviewStylesheet) {
              var head = document.getElementsByTagName('head')[0];
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type = 'text/css';
              link.href = options.webviewStylesheet;
              head.appendChild(link);
            }

            break;
          }

        case 'display':
          {
            var args = decoded.args && decoded.args.length && decoded.args[0];
            var target;

            if (!args) {
              target = undefined;
            } else if (args.target) {
              target = args.target.toString();
            } else if (args.spine) {
              target = parseInt(args.spine);
            }

            if (rendition) {
              rendition.display(target);
            } else {
              q.push(message);
            }

            break;
          }

        case 'flow':
          {
            var direction = decoded.args.length && decoded.args[0];
            axis = direction === 'paginated' ? 'horizontal' : 'vertical';

            if (rendition) {
              rendition.flow(direction);
            } else {
              q.push(message);
            }

            break;
          }

        case 'resize':
          {
            var width = decoded.args.length && decoded.args[0];
            var height = decoded.args.length > 1 && decoded.args[1];

            if (rendition) {
              rendition.resize(width, height);
            } else {
              q.push(message);
            }

            break;
          }

        case 'updateLayout':
          {
            if (rendition) {
              rendition.manager.updateLayout();
            }

            break;
          }

        case 'setLocations':
          {
            var locations = decoded.args[0];

            if (book) {
              book.locations.load(locations);
            } else {
              q.push(message);
            }

            if (rendition) {
              rendition.reportLocation();
            }

            break;
          }

        case 'reportLocation':
          {
            if (rendition) {
              rendition.reportLocation();
            } else {
              q.push(message);
            }

            break;
          }

        case 'minSpreadWidth':
          {
            minSpreadWidth = decoded.args;
            break;
          }

        case 'mark':
          {
            if (rendition) {
              rendition.annotations.mark.apply(rendition.annotations, decoded.args);
            } else {
              q.push(message);
            }

            break;
          }

        case 'underline':
          {
            if (rendition) {
              rendition.annotations.underline.apply(rendition.annotations, decoded.args);
            } else {
              q.push(message);
            }

            break;
          }

        case 'highlight':
          {
            if (rendition) {
              rendition.annotations.highlight.apply(rendition.annotations, decoded.args);
            } else {
              q.push(message);
            }

            break;
          }

        case 'removeAnnotation':
          {
            if (rendition) {
              rendition.annotations.remove.apply(rendition.annotations, decoded.args);
            } else {
              q.push(message);
            }

            break;
          }

        case 'themes':
          {
            var themes = decoded.args[0];

            if (rendition) {
              rendition.themes.register(themes);
            } else {
              q.push(message);
            }

            break;
          }

        case 'theme':
          {
            var theme = decoded.args[0];

            if (rendition) {
              rendition.themes.select(theme);
            } else {
              q.push(message);
            }

            break;
          }

        case 'fontSize':
          {
            var fontSize = decoded.args[0];

            if (rendition) {
              rendition.themes.fontSize(fontSize);
            } else {
              q.push(message);
            }

            break;
          }

        case 'font':
          {
            var font = decoded.args[0];

            if (rendition) {
              rendition.themes.font(font);
            } else {
              q.push(message);
            }

            break;
          }

        case 'override':
          {
            if (rendition) {
              rendition.themes.override.apply(rendition.themes, decoded.args);
            } else {
              q.push(message);
            }

            break;
          }

        case 'gap':
          {
            var gap = decoded.args[0];

            if (rendition) {
              rendition.settings.gap = gap;

              if (rendition.manager) {
                rendition.manager.settings.gap = gap;
              }
            } else {
              q.push(message);
            }

            break;
          }

        case 'next':
          {
            if (rendition) {
              rendition.next();
            } else {
              q.push(message);
            }

            break;
          }

        case 'prev':
          {
            if (rendition) {
              rendition.prev();
            } else {
              q.push(message);
            }

            break;
          }

        case 'unselectAllText':
          {
            if (rendition) {
              rendition.getContents()[0].document.getSelection().removeAllRanges();
            } else {
              q.push(message);
            }

            break;
          }
      }
    }

    function openEpub(url, epubOptions, renderOptions) {
      var settings = (0, _extends2.default)({
        manager: 'default',
        overflow: 'visible',
        method: 'blobUrl',
        fullsize: true,
        snap: isChrome
      }, renderOptions);
      window.book = book = ePub(url, epubOptions);
      window.rendition = rendition = book.renderTo(document.body, settings);
      rendition.hooks.content.register(function (contents, rendition) {
        var doc = contents.document;
        var startPosition = {
          x: -1,
          y: -1
        };
        var currentPosition = {
          x: -1,
          y: -1
        };
        var isLongPress = false;
        var longPressTimer;
        var touchduration = 250;
        var $body = doc.getElementsByTagName('body')[0];
        var lastTap = undefined;
        var preventTap = false;
        var doubleTap = false;
        contents.addStylesheet('http://localhost:3222/custom.css');

        function touchStartHandler(e) {
          var f, target;
          startPosition.x = e.targetTouches[0].pageX;
          startPosition.y = e.targetTouches[0].pageY;
          currentPosition.x = e.targetTouches[0].pageX;
          currentPosition.y = e.targetTouches[0].pageY;
          isLongPress = false;
          touchstartX = e.changedTouches[0].screenX;

          if (isWebkit) {
            for (var i = 0; i < e.targetTouches.length; i++) {
              f = e.changedTouches[i].force;

              if (f >= 0.8 && !preventTap) {
                target = e.changedTouches[i].target;

                if (target.getAttribute('ref') === 'epubjs-mk') {
                  return;
                }

                clearTimeout(longPressTimer);
                cfi = contents.cfiFromNode(target).toString();
                sendMessage({
                  method: 'longpress',
                  position: currentPosition,
                  cfi: cfi
                });
                isLongPress = false;
                preventTap = true;
              }
            }
          }

          var now = Date.now();

          if (lastTap && now - lastTap < touchduration && !doubleTap) {
            var imgSrc = null;

            if (e.changedTouches[0].target.hasAttribute('src')) {
              imgSrc = e.changedTouches[0].target.getAttribute('src');
            }

            doubleTap = true;
            preventTap = true;
            cfi = contents.cfiFromNode(e.changedTouches[0].target).toString();
            sendMessage({
              method: 'dblpress',
              position: currentPosition,
              cfi: cfi,
              imgSrc: imgSrc
            });
          } else {
            lastTap = now;
          }

          longPressTimer = setTimeout(function () {
            target = e.targetTouches[0].target;

            if (target.getAttribute('ref') === 'epubjs-mk') {
              return;
            }

            cfi = contents.cfiFromNode(target).toString();
            sendMessage({
              method: 'longpress',
              position: currentPosition,
              cfi: cfi
            });
            preventTap = true;
          }, touchduration);
        }

        function touchMoveHandler(e) {
          currentPosition.x = e.targetTouches[0].pageX;
          currentPosition.y = e.targetTouches[0].pageY;
          clearTimeout(longPressTimer);
        }

        function touchEndHandler(e) {
          var cfi;
          clearTimeout(longPressTimer);
          touchendX = e.changedTouches[0].screenX;
          checkDirection();

          if (preventTap) {
            preventTap = false;
            return;
          }

          if (Math.abs(startPosition.x - currentPosition.x) < 2 && Math.abs(startPosition.y - currentPosition.y) < 2) {
            var target = e.changedTouches[0].target;

            if (target.getAttribute('ref') === 'epubjs-mk' || target.getAttribute('ref') === 'epubjs-hl' || target.getAttribute('ref') === 'epubjs-ul') {
              return;
            }

            cfi = contents.cfiFromNode(target).toString();

            if (isLongPress) {
              sendMessage({
                method: 'longpress',
                position: currentPosition,
                cfi: cfi
              });
              isLongPress = false;
            } else {
              setTimeout(function () {
                if (preventTap || doubleTap) {
                  preventTap = false;
                  isLongPress = false;
                  doubleTap = false;
                  return;
                }

                sendMessage({
                  method: 'press',
                  position: currentPosition,
                  cfi: cfi
                });
              }, touchduration);
            }
          }
        }

        function touchForceHandler(e) {
          var f = e.changedTouches[0].force;

          if (f >= 0.8 && !preventTap) {
            var target = e.changedTouches[0].target;

            if (target.getAttribute('ref') === 'epubjs-mk') {
              return;
            }

            clearTimeout(longPressTimer);
            cfi = contents.cfiFromNode(target).toString();
            sendMessage({
              method: 'longpress',
              position: currentPosition,
              cfi: cfi
            });
            isLongPress = false;
            preventTap = true;
            doubleTap = false;
          }
        }

        doc.addEventListener('touchstart', touchStartHandler, false);
        doc.addEventListener('touchmove', touchMoveHandler, false);
        doc.addEventListener('touchend', touchEndHandler, false);
        doc.addEventListener('touchforcechange', touchForceHandler, false);
      }.bind(this));
      rendition.on('relocated', function (location) {
        sendMessage({
          method: 'relocated',
          location: location
        });
      });
      rendition.on('selected', function (cfiRange, contents) {
        var range = contents.range(cfiRange);
        var rect = range.getBoundingClientRect();
        var selectedCfiRange = cfiRange;
        var selectedText = contents.document.getSelection().toString();
        sendMessage({
          method: 'selected',
          cfiRange: cfiRange,
          selectedRect: rect,
          selectedText: selectedText
        });
      });
      rendition.on('markClicked', function (cfiRange, data, contents) {
        var range = contents.range(cfiRange);
        var rect = range.getBoundingClientRect();
        sendMessage({
          method: 'markClicked',
          cfiRange: cfiRange,
          selectedRect: rect
        });
      });
      rendition.on('rendered', function (section) {
        sendMessage({
          method: 'rendered',
          sectionIndex: section.index
        });
      });
      rendition.on('rendered', function (section) {
        document.documentElement.style.overflowX = 'hidden';
      });
      rendition.on('added', function (section) {
        sendMessage({
          method: 'added',
          sectionIndex: section.index
        });
      });
      rendition.on('removed', function (section) {
        sendMessage({
          method: 'removed',
          sectionIndex: section.index
        });
      });
      rendition.on('resized', function (size) {
        sendMessage({
          method: 'resized',
          size: size
        });
      });
      rendition.started.then(function () {
        var msg;

        for (var i = 0; i < q.length; i++) {
          msg = q.shift();
          handleMessage(msg);
        }
      });
      book.ready.then(function () {
        _isReady = true;
        sendMessage({
          method: 'ready'
        });
      });
      window.addEventListener('unload', function () {
        book && book.destroy();
      });
    }

    window.addEventListener('message', onMessage);
    document.addEventListener('message', onMessage);
    sendMessage({
      method: 'loaded',
      value: true
    });
  }

  if (document.readyState === 'complete') {
    _ready();
  } else {
    window.addEventListener('load', _ready, false);
  }
})();

if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';

      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}