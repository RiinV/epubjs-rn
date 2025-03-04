var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bookOptionsExtras = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeOrientation = _interopRequireDefault(require("@lightbase/react-native-orientation"));

var _rnFetchBlob = _interopRequireDefault(require("rn-fetch-blob"));

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

var _epubjs = _interopRequireWildcard(require("epubjs"));

var _Rendition = _interopRequireDefault(require("./Rendition"));

var _Streamer = _interopRequireDefault(require("./Streamer"));

var _jsxFileName = "/Users/sarpaktug/Documents/SGProjects/epubjs-rn/src/Epub.js";

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultContentInset = {
  top: 0,
  bottom: 32
};

if (!global.Blob) {
  global.Blob = _rnFetchBlob.default.polyfill.Blob;
}

global.JSZip = global.JSZip || require('jszip');
global.URL = require('epubjs/libs/url/url-polyfill.js');

if (!global.btoa) {
  global.btoa = require('base-64').encode;
}

var core = require('epubjs/lib/utils/core');

var Uri = require('epubjs/lib/utils/url');

var Path = require('epubjs/lib/utils/path');

var bookOptionsExtras = {
  manager: 'continuous'
};
exports.bookOptionsExtras = bookOptionsExtras;

var Epub = function (_Component) {
  (0, _inherits2.default)(Epub, _Component);

  var _super = _createSuper(Epub);

  function Epub(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Epub);
    _this = _super.call(this, props);

    var bounds = _reactNative.Dimensions.get('window');

    _this.state = {
      toc: [],
      show: false,
      width: bounds.width,
      height: bounds.height,
      orientation: 'PORTRAIT'
    };
    _this.streamer = new _Streamer.default();
    return _this;
  }

  (0, _createClass2.default)(Epub, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.active = true;
      this._isMounted = true;

      _reactNative.AppState.addEventListener('change', this._handleAppStateChange.bind(this));

      _reactNativeOrientation.default.addSpecificOrientationListener(this._orientationDidChange.bind(this));

      var orientation = _reactNativeOrientation.default.getInitialOrientation();

      if (orientation && (orientation === 'PORTRAITUPSIDEDOWN' || orientation === 'UNKNOWN')) {
        orientation = 'PORTRAIT';
        this.setState({
          orientation: orientation
        });
      } else if (orientation) {
        this.setState({
          orientation: orientation
        });
      } else if (orientation === null) {
        orientation = this.state.width > this.state.height ? 'LANDSCAPE' : 'PORTRAIT';
        this.setState({
          orientation: orientation
        });
      }

      if (this.props.src) {
        this._loadBook(this.props.src);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;

      _reactNative.AppState.removeEventListener('change', this._handleAppStateChange);

      _reactNativeOrientation.default.removeSpecificOrientationListener(this._orientationDidChange);

      clearTimeout(this.orientationTimeout);
      this.streamer.kill();
      this.destroy();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.show !== this.state.show) {
        return true;
      }

      if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
        return true;
      }

      if (nextState.width !== this.state.width || nextState.height !== this.state.height) {
        return true;
      }

      if (nextProps.scrollEnabled !== this.props.scrollEnabled) {
        return true;
      }

      if (nextProps.pagingEnabled !== this.props.pagingEnabled) {
        return true;
      }

      if (nextProps.color != this.props.color) {
        return true;
      }

      if (nextProps.backgroundColor != this.props.backgroundColor) {
        return true;
      }

      if (nextProps.size != this.props.size) {
        return true;
      }

      if (nextProps.flow != this.props.flow) {
        return true;
      }

      if (nextProps.origin != this.props.origin) {
        return true;
      }

      if (nextProps.orientation != this.props.orientation) {
        return true;
      }

      if (nextProps.src != this.props.src) {
        return true;
      }

      if (nextProps.onPress != this.props.onPress) {
        return true;
      }

      if (nextProps.onLongPress != this.props.onLongPress) {
        return true;
      }

      if (nextProps.onDblPress != this.props.onDblPress) {
        return true;
      }

      if (nextProps.stylesheet != this.props.stylesheet) {
        return true;
      }

      if (nextProps.javascript != this.props.javascript) {
        return true;
      }

      return false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.src !== this.props.src) {
        this.destroy();

        this._loadBook(this.props.src);
      } else if (prevProps.orientation !== this.props.orientation) {
        _orientationDidChange(this.props.orientation);
      }
    }
  }, {
    key: "_orientationDidChange",
    value: function _orientationDidChange(orientation) {
      var wait = 10;
      var _orientation = orientation;

      if (!this.active || !this._isMounted) {
        return;
      }

      if (orientation === 'PORTRAITUPSIDEDOWN' || orientation === 'UNKNOWN') {
        _orientation = 'PORTRAIT';
      }

      if (orientation === 'LANDSCAPE-RIGHT' || orientation === 'LANDSCAPE-LEFT') {
        _orientation = 'LANDSCAPE';
      }

      if (this.state.orientation === _orientation) {
        return;
      }

      this.setState({
        orientation: _orientation
      });
      this.props.onOrientationChanged && this.props.onOrientationChanged(_orientation);
    }
  }, {
    key: "_loadBook",
    value: function _loadBook(bookUrl) {
      var options = this.props.options || {};
      this.book = (0, _epubjs.default)(_objectSpread(_objectSpread({
        replacements: this.props.base64 || 'none'
      }, options), bookOptionsExtras));
      return this._openBook(bookUrl);
    }
  }, {
    key: "_openBook",
    value: function _openBook(bookUrl, useBase64) {
      var _this2 = this;

      var type = useBase64 ? 'base64' : null;

      if (!this.rendition) {
        this.needsOpen = [bookUrl, useBase64];
        return;
      }

      this.book.open(bookUrl).catch(function (err) {
        console.error(err);
      });
      this.book.ready.then(function () {
        _this2.isReady = true;
        _this2.props.onReady && _this2.props.onReady(_this2.book);
      });
      this.book.loaded.navigation.then(function (nav) {
        if (!_this2.active || !_this2._isMounted) {
          return;
        }

        _this2.setState({
          toc: nav.toc
        });

        _this2.props.onNavigationReady && _this2.props.onNavigationReady(nav.toc);
      });

      if (this.props.generateLocations != false) {
        this.loadLocations().then(function (locations) {
          _this2.rendition.setLocations(locations);

          _this2.props.onLocationsReady && _this2.props.onLocationsReady(_this2.book.locations);
        });
      }
    }
  }, {
    key: "loadLocations",
    value: function loadLocations() {
      var _this3 = this;

      return this.book.ready.then(function () {
        var key = _this3.book.key() + '-locations';
        return _asyncStorage.default.getItem(key).then(function (stored) {
          if (_this3.props.regenerateLocations != true && stored !== null) {
            return _this3.book.locations.load(stored);
          }

          return _this3.book.locations.generate(_this3.props.locationsCharBreak || 600).then(function (locations) {
            _asyncStorage.default.setItem(key, _this3.book.locations.save());

            return locations;
          });
        });
      });
    }
  }, {
    key: "onRelocated",
    value: function onRelocated(visibleLocation) {
      this._visibleLocation = visibleLocation;

      if (this.props.onLocationChange) {
        this.props.onLocationChange(visibleLocation);
      }
    }
  }, {
    key: "visibleLocation",
    value: function visibleLocation() {
      return this._visibleLocation;
    }
  }, {
    key: "getRange",
    value: function getRange(cfi) {
      return this.book.getRange(cfi);
    }
  }, {
    key: "_handleAppStateChange",
    value: function _handleAppStateChange(appState) {
      if (appState === 'active') {
        this.active = true;
      }

      if (appState === 'background') {
        this.active = false;
      }

      if (appState === 'inactive') {
        this.active = false;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.book) {
        this.book.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement(_Rendition.default, (0, _extends2.default)({
        ref: function ref(r) {
          var _this4$props, _this4$props2;

          _this4.rendition = r;
          ((_this4$props = _this4.props) == null ? void 0 : _this4$props.setRenditionRef) && ((_this4$props2 = _this4.props) == null ? void 0 : _this4$props2.setRenditionRef(r));

          if (_this4.needsOpen) {
            _this4._openBook.apply(_this4, _this4.needsOpen);

            _this4.needsOpen = undefined;
          }
        },
        url: this.props.src,
        flow: this.props.flow,
        minSpreadWidth: this.props.minSpreadWidth,
        stylesheet: this.props.stylesheet,
        webviewStylesheet: this.props.webviewStylesheet,
        showIndicator: this.props.showIndicator,
        script: this.props.script,
        onSelected: this.props.onSelected,
        onMarkClicked: this.props.onMarkClicked,
        onPress: this.props.onPress,
        onLongPress: this.props.onLongPress,
        onDblPress: this.props.onDblPress,
        onViewAdded: this.props.onViewAdded,
        beforeViewRemoved: this.props.beforeViewRemoved,
        onTextSelectedContextMenuItems: this.props.onTextSelectedContextMenuItems,
        onCustomMenuSelection: this.props.onCustomMenuSelection,
        themes: this.props.themes,
        theme: this.props.theme,
        fontSize: this.props.fontSize,
        font: this.props.font,
        display: this.props.location,
        onRelocated: this.onRelocated.bind(this),
        orientation: this.state.orientation,
        backgroundColor: this.props.backgroundColor,
        onError: this.props.onError,
        contentInset: this.props.contentInset || defaultContentInset,
        onDisplayed: this.props.onDisplayed,
        width: this.props.width,
        height: this.props.height,
        scalesPageToFit: this.props.scalesPageToFit,
        resizeOnOrientationChange: this.props.resizeOnOrientationChange,
        showsHorizontalScrollIndicator: this.props.showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator: this.props.showsVerticalScrollIndicator,
        scrollEnabled: this.props.scrollEnabled,
        pagingEnabled: this.props.pagingEnabled,
        onNavigationStateChange: this.props.onNavigationStateChange,
        onShouldStartLoadWithRequest: this.props.onShouldStartLoadWithRequest,
        isContentReady: this.props.isContentReady,
        options: this.props.options
      }, this.props.webviewProps || {}, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 320,
          columnNumber: 7
        }
      }));
    }
  }]);
  return Epub;
}(_react.Component);

var defaultBackgroundColor = '#FEFEFE';

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  manager: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: defaultBackgroundColor
  },
  rowContainer: {
    flex: 1
  },
  loadScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

var _default = Epub;
exports.default = _default;