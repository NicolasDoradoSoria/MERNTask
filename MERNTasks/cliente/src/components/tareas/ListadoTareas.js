import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";

const ListadoTareas = () => {
  const proyectosContexst = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContexst;

  //obtener las tareas del proyecto
  const tareasContext = useContext(TareaContext);
  const { tareasproyecto } = tareasContext;

  //si no hay proyecto seleccionado
  if (!proyecto) return <h2>selecciona un proyecto</h2>;
  //array destructiong para extar el pryecto actual
  const [proyectoActual] = proyecto;


  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>no hay tareas</p>
          </li>
        ) : 
          tareasproyecto.map((tarea) => <Tarea tarea={tarea} key={tarea._id}/>)
        }

        <button
          type="button"
          className="btn btn-eliminar"
          onClick={() => eliminarProyecto(proyectoActual._id)}
        >
          Eliminar Proyecto &times;
        </button>
      </ul>
    </Fragment>
  );
};

export default ListadoTareas;
