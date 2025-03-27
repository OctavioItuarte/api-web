function checkRole(roles) {
    return (req, res, next) => {
      if (req.user && roles.includes(req.user.role)) {
        return next();
      }
      res.status(403).send("Acceso denegado: No tienes permisos.");
    };
}

module.exports = checkRole;