var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _possibleConstructorReturn2 = _interopRequireDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));

var _getPrototypeOf2 = _interopRequireDefault(require('@babel/runtime/helpers/getPrototypeOf'));

var _react = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _reactNativeWebview = require('react-native-webview');

var _eventEmitter = _interopRequireDefault(require('event-emitter'));

var _utils = require('./utils');

var _jsxFileName = '/Users/kaarel/Dev/RA/epub/epubjs-rn/src/Rendition.js';

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') {
    return null;
  }
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) {
    return false;
  }
  if (Reflect.construct.sham) {
    return false;
  }
  if (typeof Proxy === 'function') {
    return true;
  }
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var setPlatform = '<script>window.platform = "' + _reactNative.Platform.OS + '"</script>';

var getEmbeddedHtml = function getEmbeddedHtml(backgroundColor) {
  return (
    '\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover">\n  <title>epubjs</title>\n  ' +
    setPlatform +
    '\n  ' +
    _utils.renditionEmbeddedScripts +
    '\n  <style>\n    body {\n      background-color: ' +
    backgroundColor +
    ';\n      margin: 1px 0 0;\n      -webkit-tap-highlight-color: rgba(0,0,0,0);\n      -webkit-tap-highlight-color: transparent; /* For some Androids */\n    }\n\n    * {\n      overscroll-behavior: none !important;\n    }\n\n    /* For iPhone X Notch */\n    @media only screen\n      and (min-device-width : 375px)\n      and (max-device-width : 812px)\n      and (-webkit-device-pixel-ratio : 3) {\n      body {\n        padding-top: calc(env(safe-area-inset-top) / 2);\n      }\n    }\n  </style>\n</head><body></body></html>\n'
  );
};

var Rendition = (function (_Component) {
  (0, _inherits2.default)(Rendition, _Component);

  var _super = _createSuper(Rendition);

  function Rendition(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Rendition);
    _this = _super.call(this, props);
    _this.framerRef = _react.default.createRef();
    _this.webviewbridgeRef = _react.default.createRef();
    _this.state = {
      loaded: false,
      showIndicator: false,
    };
    return _this;
  }

  (0, _createClass2.default)(Rendition, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._isMounted = true;

        if (this.props.url) {
          this.load(this.props.url);
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._isMounted = false;
        this.destroy();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.state.loaded) {
          var _this$props$isContent, _this$props;

          (_this$props$isContent = (_this$props = this.props).isContentReady) == null
            ? void 0
            : _this$props$isContent.call(_this$props, true);
        }

        if (prevProps.url !== this.props.url) {
          this.load(this.props.url);
        }

        if (prevProps.display !== this.props.display) {
          this.display(this.props.display);
        }

        if (prevProps.orientation !== this.props.orientation) {
        }

        if (prevProps.flow !== this.props.flow) {
          this.flow(this.props.flow || 'paginated');
        }

        if (prevProps.themes !== this.props.themes) {
          this.themes(this.props.themes);
        }

        if (prevProps.themes !== this.props.theme) {
          this.theme(this.props.theme);
        }

        if (prevProps.fontSize !== this.props.fontSize) {
          this.fontSize(this.props.fontSize);
        }

        if (prevProps.font !== this.props.font) {
          this.font(this.props.font);
        }

        if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
          this.resize(this.props.width, this.props.height);
        }
      },
    },
    {
      key: 'load',
      value: function load(bookUrl) {
        if (!this._webviewLoaded) {
          return;
        }

        var config = {
          minSpreadWidth: this.props.minSpreadWidth || 815,
          flow: this.props.flow || 'paginated',
          gap: this.props.gap,
          fullsize: true,
        };

        if (this.props.stylesheet) {
          config.stylesheet = this.props.stylesheet;
        }

        if (this.props.webviewStylesheet) {
          config.webviewStylesheet = this.props.webviewStylesheet;
        }

        if (this.props.script) {
          config.script = this.props.script;
        }

        if (this.props.width) {
          config.width = this.props.width;
        }

        if (this.props.height) {
          config.height = this.props.height;
        }

        if (this.props.disableOrientationEvent) {
          config.resizeOnOrientationChange = this.props.resizeOnOrientationChange;
        }

        this.sendToBridge('open', [bookUrl, config, this.props.options]);
        this.display(this.props.display);

        if (this.props.themes) {
          this.themes(this.props.themes);
        }

        if (this.props.theme) {
          this.theme(this.props.theme);
        }

        if (this.props.fontSize) {
          this.fontSize(this.props.fontSize);
        }

        if (this.props.font) {
          this.font(this.props.font);
        }
      },
    },
    {
      key: 'display',
      value: function display(target) {
        var spine = typeof target === 'number' && target;

        if (!this._webviewLoaded) {
          return;
        }

        if (spine) {
          this.sendToBridge('display', [
            {
              spine: spine,
            },
          ]);
        } else if (target) {
          this.sendToBridge('display', [
            {
              target: target,
            },
          ]);
        } else {
          this.sendToBridge('display');
        }
      },
    },
    {
      key: 'resize',
      value: function resize(w, h) {
        if (!w || !h) {
          return;
        }

        this.sendToBridge('resize', [w, h]);
      },
    },
    {
      key: 'flow',
      value: function flow(f) {
        this.sendToBridge('flow', [f]);
      },
    },
    {
      key: 'themes',
      value: function themes(t) {
        this.sendToBridge('themes', [t]);
      },
    },
    {
      key: 'theme',
      value: function theme(t) {
        this.sendToBridge('theme', [t]);
      },
    },
    {
      key: 'font',
      value: function font(f) {
        this.sendToBridge('font', [f]);
      },
    },
    {
      key: 'fontSize',
      value: function fontSize(f) {
        this.sendToBridge('fontSize', [f]);
      },
    },
    {
      key: 'override',
      value: function override(name, value, priority) {
        this.sendToBridge('override', [name, value, priority]);
      },
    },
    {
      key: 'gap',
      value: function gap(_gap) {
        this.sendToBridge('gap', [_gap]);
      },
    },
    {
      key: 'setLocations',
      value: function setLocations(locations) {
        this.locations = locations;

        if (this.isReady) {
          this.sendToBridge('setLocations', [this.locations]);
        }
      },
    },
    {
      key: 'reportLocation',
      value: function reportLocation() {
        if (this.isReady) {
          this.sendToBridge('reportLocation');
        }
      },
    },
    {
      key: 'highlight',
      value: function highlight(cfiRange, data, cb, className, style) {
        this.sendToBridge('highlight', [cfiRange, data, cb, className, style]);
      },
    },
    {
      key: 'underline',
      value: function underline(cfiRange, data) {
        this.sendToBridge('underline', [cfiRange, data]);
      },
    },
    {
      key: 'mark',
      value: function mark(cfiRange, data) {
        this.sendToBridge('mark', [cfiRange, data]);
      },
    },
    {
      key: 'unhighlight',
      value: function unhighlight(cfiRange) {
        this.sendToBridge('removeAnnotation', [cfiRange, 'highlight']);
      },
    },
    {
      key: 'ununderline',
      value: function ununderline(cfiRange) {
        this.sendToBridge('removeAnnotation', [cfiRange, 'underline']);
      },
    },
    {
      key: 'unmark',
      value: function unmark(cfiRange) {
        this.sendToBridge('removeAnnotation', [cfiRange, 'mark']);
      },
    },
    {
      key: 'next',
      value: function next() {
        this.sendToBridge('next');
      },
    },
    {
      key: 'prev',
      value: function prev() {
        this.sendToBridge('prev');
      },
    },
    {
      key: 'unselectAllText',
      value: function unselectAllText() {
        this.sendToBridge('unselectAllText');
      },
    },
    {
      key: 'destroy',
      value: function destroy() {},
    },
    {
      key: 'postMessage',
      value: function postMessage(str) {
        if (this.webviewbridgeRef.current) {
          return this.webviewbridgeRef.current.webviewbridge.postMessage(str);
        }
      },
    },
    {
      key: 'sendToBridge',
      value: function sendToBridge(method, args, promiseId) {
        var str = JSON.stringify({
          method: method,
          args: args,
          promise: promiseId,
        });

        if (!this.webviewbridgeRef.current) {
          return;
        }

        this.webviewbridgeRef.current.postMessage(str);
      },
    },
    {
      key: '_onWebViewLoaded',
      value: function _onWebViewLoaded() {
        this._webviewLoaded = true;

        if (this.props.url) {
          this.load(this.props.url);
        }
      },
    },
    {
      key: '_onBridgeMessage',
      value: function _onBridgeMessage(e) {
        var _this2 = this;

        var msg = e.nativeEvent.data;
        var decoded;

        if (typeof msg === 'string') {
          try {
            decoded = JSON.parse(msg);
          } catch (err) {
            decoded = msg;
          }
        } else {
          decoded = msg;
        }

        var p;

        switch (decoded.method) {
          case 'log': {
            console.log.apply(console.log, [decoded.value]);
            break;
          }

          case 'font': {
            var _decoded;

            var showIndicator = (_decoded = decoded) == null ? void 0 : _decoded.value;

            if (showIndicator !== this.state.showIndicator) {
              this.setState({
                showIndicator: showIndicator,
              });
            }

            break;
          }

          case 'error': {
            if (this.props.onError) {
              this.props.onError(decoded.value);
            } else {
              console.error.apply(console.error, [decoded.value]);
            }

            break;
          }

          case 'loaded': {
            this._onWebViewLoaded();

            break;
          }

          case 'hide': {
            this.setState({
              showIndicator: true,
            });
            setTimeout(function () {
              _this2.setState({
                showIndicator: false,
              });
            }, 1000);
            break;
          }

          case 'rendered': {
            if (!this.state.loaded) {
              this.setState({
                loaded: true,
              });
            }

            break;
          }

          case 'relocated': {
            var _decoded2 = decoded,
              location = _decoded2.location;

            this._relocated(location);

            if (!this.state.loaded) {
              this.setState({
                loaded: true,
              });
            }

            break;
          }

          case 'resized': {
            var _decoded3 = decoded,
              size = _decoded3.size;
            break;
          }

          case 'press': {
            this.props.onPress && this.props.onPress(decoded.cfi, decoded.position, this);
            break;
          }

          case 'longpress': {
            this.props.onLongPress && this.props.onLongPress(decoded.cfi, this);
            break;
          }

          case 'dblpress': {
            this.props.onDblPress && this.props.onDblPress(decoded.cfi, decoded.position, decoded.imgSrc, this);
            break;
          }

          case 'selected': {
            var _decoded4 = decoded,
              cfiRange = _decoded4.cfiRange,
              selectedRect = _decoded4.selectedRect,
              selectedText = _decoded4.selectedText;

            this._selected(cfiRange, selectedRect, selectedText);

            break;
          }

          case 'markClicked': {
            var _decoded5 = decoded,
              _cfiRange = _decoded5.cfiRange,
              _selectedRect = _decoded5.selectedRect;

            this._markClicked(_cfiRange, _selectedRect);

            break;
          }

          case 'added': {
            var _decoded6 = decoded,
              sectionIndex = _decoded6.sectionIndex;
            this.props.onViewAdded && this.props.onViewAdded(sectionIndex);
            break;
          }

          case 'removed': {
            var _decoded7 = decoded,
              _sectionIndex = _decoded7.sectionIndex;
            this.props.beforeViewRemoved && this.props.beforeViewRemoved(_sectionIndex);
            break;
          }

          case 'ready': {
            this._ready();

            break;
          }

          default: {
          }
        }
      },
    },
    {
      key: '_relocated',
      value: function _relocated(visibleLocation) {
        this._visibleLocation = visibleLocation;

        if (this.props.onRelocated) {
          this.props.onRelocated(visibleLocation, this);
        }
      },
    },
    {
      key: '_selected',
      value: function _selected(cfiRange, selectedRect, selectedText) {
        if (this.props.onSelected) {
          this.props.onSelected(cfiRange, selectedRect, selectedText);
        }
      },
    },
    {
      key: '_markClicked',
      value: function _markClicked(cfiRange, selectedRect) {
        if (this.props.onMarkClicked) {
          this.props.onMarkClicked(cfiRange, selectedRect, this);
        }
      },
    },
    {
      key: '_ready',
      value: function _ready() {
        this.isReady = true;

        if (this.locations) {
          this.sendToBridge('setLocations', [this.locations]);
        }

        this.props.onDisplayed && this.props.onDisplayed();
      },
    },
    {
      key: 'updateLayout',
      value: function updateLayout() {
        this.sendToBridge('updateLayout');
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var loader = _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            onPress: function onPress() {
              return _this3.props.onPress('');
            },
            style: styles.loadScreen,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 449,
              columnNumber: 7,
            },
          },
          _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.loadScreen,
                {
                  backgroundColor: this.props.backgroundColor || '#FFFFFF',
                },
              ],
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 450,
                columnNumber: 9,
              },
            },
            _react.default.createElement(_reactNative.ActivityIndicator, {
              color: this.props.color || 'black',
              size: this.props.size || 'large',
              style: {
                flex: 1,
              },
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 457,
                columnNumber: 11,
              },
            }),
          ),
        );

        if (!this.props.url) {
          return loader;
        }

        return _react.default.createElement(
          _reactNative.View,
          {
            ref: this.framerRef,
            style: [
              styles.container,
              {
                maxWidth: this.props.width,
                maxHeight: this.props.height,
                minWidth: this.props.width,
                minHeight: this.props.height,
              },
            ],
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 471,
              columnNumber: 7,
            },
          },
          _react.default.createElement(
            _reactNativeWebview.WebView,
            (0, _extends2.default)(
              {
                showsHorizontalScrollIndicator: this.props.showsHorizontalScrollIndicator,
                showsVerticalScrollIndicator: this.props.showsVerticalScrollIndicator,
                ref: this.webviewbridgeRef,
                source: {
                  html: getEmbeddedHtml(this.props.backgroundColor),
                  baseUrl: this.props.url,
                },
                style: [
                  styles.manager,
                  {
                    opacity: 0.99,
                    backgroundColor: this.props.backgroundColor || '#FFFFFF',
                  },
                ],
                bounces: false,
                javaScriptEnabled: true,
                scrollEnabled: this.props.scrollEnabled,
                pagingEnabled: this.props.pagingEnabled,
                onMessage: this._onBridgeMessage.bind(this),
                contentInsetAdjustmentBehavior: 'never',
                menuItems: this.props.onTextSelectedContextMenuItems,
                onCustomMenuSelection: this.props.onCustomMenuSelection,
                contentInset: this.props.contentInset,
                scalesPageToFit: this.props.scalesPageToFit || false,
                automaticallyAdjustContentInsets: false,
                originWhitelist: ['*'],
                allowsLinkPreview: false,
                onNavigationStateChange: this.props.onNavigationStateChange,
                onShouldStartLoadWithRequest: this.props.onShouldStartLoadWithRequest,
              },
              this.props.webviewProps || {},
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 482,
                  columnNumber: 9,
                },
              },
            ),
          ),
          !this.state.loaded || this.state.showIndicator || this.props.showIndicator ? loader : null,
        );
      },
    },
  ]);
  return Rendition;
})(_react.Component);

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  manager: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#F8F8F8',
  },
  rowContainer: {
    flex: 1,
  },
  loadScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Rendition.defaultProps = {
  showsHorizontalScrollIndicator: true,
  showsVerticalScrollIndicator: true,
};
(0, _eventEmitter.default)(Rendition.prototype);
var _default = Rendition;
exports.default = _default;
