function admin(req, res, next) {
  if (req.user.role != "admin")
    return res.redirect("http://localhost:3000/home");
  next();
}

module.exports = admin;
