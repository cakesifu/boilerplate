module.exports.read = function(req, res) {
  res.json({
    user: req.user
  });
};
