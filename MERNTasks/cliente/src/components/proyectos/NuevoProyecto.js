import React, { Fragment, useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";

const NuevoProyecto = () => {
  const proyectosContexst = useContext(ProyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContexst;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;
  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar el proyecto
    if(nombre === ''){
      mostrarError()
      return
    }

    agregarProyecto(proyecto)

    setProyecto({
      nombre: ''
    })
  };
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={() => mostrarFormulario()}>
        Nuevo proyectos
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="agregar proyecto"
          />
        </form>
      ) : null}

      {errorformulario? <p className="mensaje error">el nombre del proyecto es obligatorio</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
