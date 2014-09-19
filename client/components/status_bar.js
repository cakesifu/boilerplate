var Fluxxor = require("fluxxor"),
    React = require("react"),
    dom = React.DOM;

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxChildMixin(React),
    Fluxxor.StoreWatchMixin("session")
  ],

  getStateFromFlux: function() {
    var flux = this.getFlux(),
        session = flux.store("session").getState();

    return {
      "user": session.user
    };
  },

  render: function() {
    return dom.div(null,
      "Hello, " + this.state.user.name + ". ",
      dom.a({ href: "/auth/logout" }, "Logout")
    );
  }


});
