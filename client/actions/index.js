module.exports = function(config) {
  return {
    readSession: function() {
      this.dispatch("load_session");
    }
  };
};
