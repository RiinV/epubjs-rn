var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _epubjs = _interopRequireDefault(require("epubjs"));

var _Epub = _interopRequireWildcard(require("./Epub"));

var _constants = require("./constants");

var _Streamer = _interopRequireDefault(require("./Streamer"));

var _excluded = ["url", "flow", "style", "onBookChange", "onExternalLinkPress", "onShouldStartLoadWithRequest", "onNavigationStateChange", "onInitStart", "onInitEnd", "onReady", "onError", "retryState", "backgroundColor", "themes", "theme", "contentInset", "setRenditionRef"];

var _this = this,
    _jsxFileName = "/Users/sarpaktug/Documents/SGProjects/epubjs-rn/src/EpubReaderWrapper.js";

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var EpubReaderWrapper = function EpubReaderWrapper(_ref) {
  var url = _ref.url,
      flow = _ref.flow,
      style = _ref.style,
      onBookChange = _ref.onBookChange,
      onExternalLinkPress = _ref.onExternalLinkPress,
      onShouldStartLoadWithRequest = _ref.onShouldStartLoadWithRequest,
      onNavigationStateChange = _ref.onNavigationStateChange,
      onInitStart = _ref.onInitStart,
      onInitEnd = _ref.onInitEnd,
      onReady = _ref.onReady,
      onError = _ref.onError,
      retryState = _ref.retryState,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? '#FEFEFE' : _ref$backgroundColor,
      themes = _ref.themes,
      theme = _ref.theme,
      _ref$contentInset = _ref.contentInset,
      contentInset = _ref$contentInset === void 0 ? {
    top: 0,
    bottom: 32
  } : _ref$contentInset,
      setRenditionRef = _ref.setRenditionRef,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var aBook = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      src = _useState2[0],
      setSrc = _useState2[1];

  var _useState3 = (0, _react.useState)(book),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      book = _useState4[0],
      setBook = _useState4[1];

  var renditionRef = (0, _react.useRef)();
  var streamer = (0, _react.useRef)();

  var _setRenditionRef = function _setRenditionRef(ref) {
    renditionRef.current = ref;
    setRenditionRef && setRenditionRef(ref);
  };

  var _onShouldStartLoadWithRequest = function _onShouldStartLoadWithRequest(event) {
    if ((event == null ? void 0 : event.mainDocumentURL) === (event == null ? void 0 : event.url)) {
      return true;
    }

    if (event && event.url && (event.url.startsWith('https://') || event.url.startsWith('http://') && !event.url.includes('localhost'))) {
      onExternalLinkPress && onExternalLinkPress(event.url);
      return false;
    }

    if (onShouldStartLoadWithRequest !== undefined) {
      return onShouldStartLoadWithRequest(event);
    }

    return true;
  };

  var _onNavigationStateChange = function _onNavigationStateChange(event) {
    onNavigationStateChange && onNavigationStateChange(event);
  };

  var _onReady = function _onReady(b) {
    var _b$package, _b$package$metadata;

    setBook(b);
    console.log('[EPUB]', 'EPUB was changed to:', b == null ? void 0 : (_b$package = b.package) == null ? void 0 : (_b$package$metadata = _b$package.metadata) == null ? void 0 : _b$package$metadata.title);
    onReady && onReady(b);
  };

  (0, _react.useEffect)(function () {
    onBookChange && onBookChange(book);
  }, [book]);

  var _onError = function _onError(error) {
    var text = "Failed to initialize stream. Use useState and pass the state value to 'retryState'. Any change to it will try to reinitialize the view. Details: " + (error == null ? void 0 : error.toString());
    console.log('[EPUB]', text);
    onError && onError(text);
  };

  var initialize = function initialize(url) {
    var _streamer$current, _aBook$current, _streamer$current2, _streamer$current3, type, origin, newUrl;

    return _regenerator.default.async(function initialize$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!url) {
              _context.next = 28;
              break;
            }

            _context.prev = 1;
            onInitStart && onInitStart();
            streamer == null ? void 0 : (_streamer$current = streamer.current) == null ? void 0 : _streamer$current.kill();

            if (!aBook.current) {
              aBook.current = (0, _epubjs.default)(_objectSpread({
                replacements: 'none'
              }, _Epub.bookOptionsExtras));
            }

            type = aBook == null ? void 0 : (_aBook$current = aBook.current) == null ? void 0 : _aBook$current.determineType(url);

            if (type) {
              _context.next = 9;
              break;
            }

            _onError('Failed to determine type of document (.opf or .epub)');

            return _context.abrupt("return");

          case 9:
            console.log('[EPUB]', "Type of document: " + type);

            if (!(type === 'directory' || type === 'opf')) {
              _context.next = 14;
              break;
            }

            setSrc(url);
            onInitEnd && onInitEnd();
            return _context.abrupt("return");

          case 14:
            streamer.current = new _Streamer.default();
            _context.next = 17;
            return _regenerator.default.awrap(streamer == null ? void 0 : (_streamer$current2 = streamer.current) == null ? void 0 : _streamer$current2.start());

          case 17:
            origin = _context.sent;
            _context.next = 20;
            return _regenerator.default.awrap(streamer == null ? void 0 : (_streamer$current3 = streamer.current) == null ? void 0 : _streamer$current3.get(url));

          case 20:
            newUrl = _context.sent;
            setSrc(newUrl);
            onInitEnd && onInitEnd();
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](1);

            _onError(_context.t0);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 25]], Promise);
  };

  (0, _react.useEffect)(function () {
    if (url) {
      initialize(url).then();
    }

    return function () {
      var _streamer$current4;

      streamer == null ? void 0 : (_streamer$current4 = streamer.current) == null ? void 0 : _streamer$current4.kill();
    };
  }, [url, retryState]);
  return !url ? null : _react.default.createElement(_Epub.default, (0, _extends2.default)({
    src: src,
    flow: flow || _constants.flowScrolled,
    style: style || _constants.defaultStyle,
    backgroundColor: backgroundColor,
    scalesPageToFit: false,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentInset: contentInset,
    themes: themes,
    theme: theme
  }, rest, {
    setRenditionRef: _setRenditionRef,
    onNavigationStateChange: _onNavigationStateChange,
    onShouldStartLoadWithRequest: _onShouldStartLoadWithRequest,
    onReady: _onReady,
    onError: _onError,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 5
    }
  }));
};

var _default = EpubReaderWrapper;
exports.default = _default;