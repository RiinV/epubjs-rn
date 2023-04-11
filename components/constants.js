var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.flowScrolled =
  exports.flowPaginated =
  exports.defaultStyle =
  exports.blockTextSelectionThemesObject =
  exports.blockTextSelectionThemeObject =
  exports.blockTextSelectionThemeContent =
    void 0;

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var defaultStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
};
exports.defaultStyle = defaultStyle;
var blockTextSelectionThemeContent = {
  body: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    '-webkit-tap-highlight-color': '#00000000',
  },
};
exports.blockTextSelectionThemeContent = blockTextSelectionThemeContent;
var blockTextSelectionThemeObject = 'blockTextSelectionTheme';
exports.blockTextSelectionThemeObject = blockTextSelectionThemeObject;
var blockTextSelectionThemesObject = (0, _defineProperty2.default)(
  {},
  blockTextSelectionThemeObject,
  blockTextSelectionThemeContent,
);
exports.blockTextSelectionThemesObject = blockTextSelectionThemesObject;
var flowPaginated = 'paginated';
exports.flowPaginated = flowPaginated;
var flowScrolled = 'scrolled';
exports.flowScrolled = flowScrolled;
