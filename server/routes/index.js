var auth = require("./auth"),
    session = require("./session"),
    home = require("./home"),
    debug = require("./debug");

module.exports = function(app) {

  app.use("/debug", debug(app));
  app.use("/auth", auth(app));

  app.get("/", home.homepage);
  app.get("/session", session.read);
};
