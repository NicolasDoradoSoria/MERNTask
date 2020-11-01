import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";
const FormTarea = () => {
  //extraer si un proyecto esta activo
  const proyectosContexst = useContext(ProyectoContext);
  const { proyecto } = proyectosContexst;

  //obtener la funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  //effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);
  //state del formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  //extraer el nombre del proyecto
  const { nombre } = tarea;
  //si no hay proyecto seleccionado
  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  //leer los valores del formulario

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //si es edicion o si es nueva tarea
    if (tareaseleccionada === null) {
      //agregar la nueva tarea al astate
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }else {
      //actualizar tarea existente
      actualizarTarea(tarea)
      //elinina tareaseleccionada del state
      limpiarTarea()
    }
    //obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    setTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">el nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
