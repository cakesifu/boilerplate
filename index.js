var config = require("./config"),
    logger = require("./lib/logger"),
    app = require("./server"),
    port = config.get("port");

app(config).listen(port, function(err) {
  logger.info("App started on port %s",  port);
});

