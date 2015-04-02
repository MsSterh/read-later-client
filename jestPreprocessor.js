var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    if (/(jpg|png)$/.test(filename)) return 'module.exports = "http://example.com/test.png"';

    if (babel.canCompile(filename)) {
      return babel.transform(src, { filename: filename }).code;
    }
    return src;
  }
};
