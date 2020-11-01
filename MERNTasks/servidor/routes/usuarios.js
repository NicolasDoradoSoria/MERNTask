//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
//crear el usuario
// api/usuarios
router.post(
  "/",
  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check("email", "agrega un email valido").isEmail(),
    check("password", "el password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsurio
);
module.exports = router;
