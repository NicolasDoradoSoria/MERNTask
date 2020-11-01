import React, { useContext } from "react";
import TareaContext from "../../context/tareas/TareaContext";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
const Tarea = ({ tarea }) => {
  //obtener la funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const { eliminarTarea, obtenerTareas,actualizarTarea, guardarTareaActual } = tareasContext;

//extraer si un proyecto esta activo
const proyectosContexst = useContext(ProyectoContext);
const { proyecto } = proyectosContexst;

  // extraer el proyecto
  const [proyectoActual] = proyecto
  //funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  //funcion que modifica el estado de las tareas

  const cambiaEstado = tarea =>{
    if(tarea.estado){
      tarea.estado = false
    }
    else{
      tarea.estado = tarea
      
    }
    actualizarTarea(tarea)
  }

  //agrega una tarea actual cuando el usuario desa editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea)
  }
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={() => cambiaEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="Incompleto" onClick={() => cambiaEstado(tarea)} >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button className="btn btn-primario" type="button" onClick={() => seleccionarTarea(tarea)}>
          Editar
        </button>
        <button
          className="btn btn-secundario"
          type="button"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
<p>desde tarea</p>;
