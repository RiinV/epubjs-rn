var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _reactNativeStaticServer = _interopRequireDefault(require("react-native-static-server"));

var _rnFetchBlob = _interopRequireDefault(require("rn-fetch-blob"));

var _reactNativeZipArchive = require("react-native-zip-archive");

var Dirs = _rnFetchBlob.default.fs.dirs;

if (!global.Blob) {
  global.Blob = _rnFetchBlob.default.polyfill.Blob;
}

var Uri = require('epubjs/lib/utils/url');

var EpubStreamer = function () {
  function EpubStreamer(opts) {
    (0, _classCallCheck2.default)(this, EpubStreamer);
    opts = opts || {};
    this.port = opts.port || '3222';
    this.root = opts.root || 'www';
    this.serverOrigin = 'file://';
    this.urls = [];
    this.locals = [];
    this.paths = [];
    this.started = false;
    this.server = undefined;
  }

  (0, _createClass2.default)(EpubStreamer, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      return _rnFetchBlob.default.fs.exists(Dirs.DocumentDir + "/" + this.root).then(function (exists) {
        if (!exists) {
          return _rnFetchBlob.default.fs.mkdir(Dirs.DocumentDir + "/" + _this.root);
        }
      }).then(function () {
        return new _reactNativeStaticServer.default(_this.port, _this.root, {
          localOnly: true
        });
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this.started = true;
      return this.setup().then(function (server) {
        _this2.server = server;
        return _this2.server.start();
      }).then(function (url) {
        _this2.serverOrigin = url;
        return url;
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.started = false;

      if (this.server) {
        this.server.stop();
      }
    }
  }, {
    key: "kill",
    value: function kill() {
      this.started = false;

      if (this.server) {
        this.server.kill();
      }
    }
  }, {
    key: "add",
    value: function add(bookUrl) {
      var _this3 = this;

      var filename = this.filename(bookUrl);
      var epubDir = Dirs.DocumentDir + '/' + filename + '.epub';
      var targetPath = Dirs.DocumentDir + '/' + this.root + '/' + filename;

      if (_rnFetchBlob.default.fs.exists(epubDir)) {
        return (0, _reactNativeZipArchive.unzip)(epubDir, targetPath).then(function (path) {
          var url = _this3.serverOrigin + '/' + filename + '/';

          _this3.urls.push(bookUrl);

          _this3.locals.push(url);

          _this3.paths.push(path);

          return url;
        });
      }
    }
  }, {
    key: "check",
    value: function check(bookUrl) {
      var filename = this.filename(bookUrl);
      var targetPath = Dirs.DocumentDir + "/" + this.root + "/" + filename;
      return _rnFetchBlob.default.fs.exists(targetPath);
    }
  }, {
    key: "get",
    value: function get(bookUrl) {
      var _this4 = this;

      return this.check(bookUrl).then(function (exists) {
        if (exists) {
          var filename = _this4.filename(bookUrl);

          var url = _this4.serverOrigin + "/" + filename + "/";
          return url;
        }

        return _this4.add(bookUrl);
      });
    }
  }, {
    key: "filename",
    value: function filename(bookUrl) {
      var uri = new Uri(bookUrl);
      var finalFileName;

      if (uri.filename.indexOf('?') > -1) {
        finalFileName = uri.filename.split('?')[0].replace('.epub', '');
      } else {
        finalFileName = uri.filename.replace('.epub', '');
      }

      return finalFileName;
    }
  }, {
    key: "remove",
    value: function remove(path) {
      var _this5 = this;

      return _rnFetchBlob.default.fs.lstat(path).then(function (stats) {
        var index = _this5.paths.indexOf(path);

        _this5.paths.splice(index, 1);

        _this5.urls.splice(index, 1);

        _this5.locals.splice(index, 1);
      }).catch(function (err) {});
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this6 = this;

      this.paths.forEach(function (path) {
        _this6.remove(path);
      });
    }
  }]);
  return EpubStreamer;
}();

var _default = EpubStreamer;
exports.default = _default;