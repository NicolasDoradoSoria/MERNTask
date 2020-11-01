import React, { useContext, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import Proyecto from "./Proyecto";
import AlertaContext from '../../context/alertas/alertaContext'
const ListadoProyectos = () => {
  //Extrer proyecto de state incial
  const proyectosContexst = useContext(ProyectoContext);
  const {mensaje, proyectos, obtenerProyectos } = proyectosContexst;

  const alertaContext = useContext(AlertaContext)
  const {alerta, mostrarAlerta} = alertaContext
  //obtener proyecto cuando carga el componente
  useEffect(() => {

    //SI HAY UN ERROR
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  //revisar si proyecto tiene contenido
  if (proyectos.length === 0)
    return <p>no hay proyecfto, comienza creando uno</p>;
  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      {proyectos.map((proyecto) => (
        <Proyecto proyecto={proyecto} key={proyecto._id} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
