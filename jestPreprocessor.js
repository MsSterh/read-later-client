var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    if (babel.canCompile(filename)) {
      return babel.transform(src, { filename: filename }).code;
    }
    return src;
  }
};
