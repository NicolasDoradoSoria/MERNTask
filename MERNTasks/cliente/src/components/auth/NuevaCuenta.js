import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";
const NuevaCuenta = (props) => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
      //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const { nombre, email, password, confirmar } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("todos los campos son obligatorios", "alerta-error");
      return;
    }

    if (password.length < 6) {
      mostrarAlerta(
        "el pass debe de ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta("los password no son iguales", "alerta-error");
      return;
    }

    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="tu nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="tu password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="repite tu password"
              onChange={onChange}
              value={confirmar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          velver a iniciar secion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
