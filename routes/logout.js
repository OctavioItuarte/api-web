var express = require('express');
var router = express.Router();

//Ruta para cerrar sesi�n
router.post('/logout', (req, res, next) => {
  req.logout((err) => { // Se le pasa un callback
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json("Sesión cerrada exitosamente");
    });
  });
});

module.exports = router;