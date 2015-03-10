/** @jsx React.DOM */

var
    fluxxor = require("fluxxor"),
    React = require("react");

module.exports = React.createClass({
  displayName: "app",
  mixins: [
    fluxxor.FluxMixin(React)
  ],

  render: function() {
    return (
      <div>My app</div>
    );
  }
});
