var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'No hay sesión activa' });
  }
  res.send({ user: { id: req.user._id, role: req.user.role } });
});


module.exports = router;