//rutas para aytenticar usuarios
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");
//iniciar sesion
// api/auth
router.post(
  "/",
  authController.autenticarUsuario
);
//obtiene el usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
)
module.exports = router;
