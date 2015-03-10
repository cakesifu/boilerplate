var Fluxxor = require("fluxxor"),
    React = require("react"),
    Application = require("./views/app"),
    Stores = require("./stores"),
    Actions = require("./actions");

function init(element) {
  var app, appStores, flux;

  flux = new Fluxxor.Flux(Stores(), Actions());
  app = React.createElement(Application, { flux: flux });

  React.render(app, element);
}

var el = document.getElementById("client-app");
if (el) {
  init(el);
}

module.exports.init = init;
