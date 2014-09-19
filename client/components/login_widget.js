var Fluxxor = require("fluxxor"),
    Panel = require("./ui/panel"),
    React = require("react"),
    dom = React.DOM;

module.exports = React.createClass({
  mixins: [
    Fluxxor.FluxChildMixin(React)
  ],

  render: function() {
    return Panel({ title: "Login" },
       "You can login using ",
       dom.a({ href: "/auth/google" }, "google")
    );
  }

});
