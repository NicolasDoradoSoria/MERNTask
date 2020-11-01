import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  //obtener el state de proyecto
  const proyectosContexst = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContexst;

  //obtener la funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  //funcion poara agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); // fijar el proyecto actual
    obtenerTareas(id); //filtrar las tareas cuando se le de click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
