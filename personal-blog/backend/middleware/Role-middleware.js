const Role = async (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }
  return res.status(403).json({
    message: "Forbidden - Only Admins are allowed",
  });
};

module.exports = Role;
