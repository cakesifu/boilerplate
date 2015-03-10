var
    express = require("express"),
    init = require("./init");

module.exports = function(config) {
  app = express();
  init(app, config);
  return app;
};
