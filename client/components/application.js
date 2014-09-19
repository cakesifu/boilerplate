var
    Fluxxor = require("fluxxor"),
    React = require("react"),
    LoginWidget = require("./login_widget"),
    StatusBar = require("./status_bar"),
    dom = React.DOM;

var Application = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin("session")
  ],

  getInitialState: function() {
    var flux = this.getFlux();
    flux.actions.readSession();
    return {};
  },

  getStateFromFlux: function() {
    var flux = this.getFlux(),
        session = flux.store("session").getState();

    return {
      user: session.user
    };
  },

  render: function() {
    var user = this.state.user;
    if (user) {
      out = dom.div(
        null,
        StatusBar()
      );
    } else {
      out = LoginWidget();
    }
    return out;
  }
});


module.exports = Application;
