import React, {useContext, useEffect} from "react";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import Sidebar from "../tareas/Sidebar";
import AuthContext from '../../context/auth/authContext'
const Proyectos = () => {

  //extraer la informacion de autenticacion
  const authContext = useContext(AuthContext)
  const {usuarioAutenticado} = authContext

  useEffect(() => {
    usuarioAutenticado()
      //eslint-disable-next-line
  }, [])
  return (

    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />

        <main>
          <FormTarea />
          <div className="contenedor-tareas">
                <ListadoTareas />

          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
