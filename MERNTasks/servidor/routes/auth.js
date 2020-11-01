//rutas para aytenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { autenticarUsuario, usuarioAutenticado } = require("../controllers/authController");
//iniciar sesion
// api/auth
router.post(
  "/",
  autenticarUsuario
);
//obtiene el usuario autenticado
router.get('/',
auth,
usuarioAutenticado
)
module.exports = router;
