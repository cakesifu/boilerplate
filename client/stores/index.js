var SessionStore = require("./session");

module.exports = function(config) {
  return {
    session: new SessionStore()
  };
};
