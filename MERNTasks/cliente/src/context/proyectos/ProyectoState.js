import React, { useReducer } from "react";
import ProyectoContext from "./ProyectoContext";
import ProyectoReducer from "./ProyectoReducer";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";
import clienteAxios from "../../config/axios";
const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };

  //dispath para ejecutar las acciones

  const [state, displatch] = useReducer(ProyectoReducer, initialState);

  //serie de funciones para el CRUD
  const mostrarFormulario = () => {
    displatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      displatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "hubo un error",
        categoria: "alerta-error",
      };
      displatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };

  //agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("api/proyectos", proyecto);
      console.log(resultado);

      //insertar el proyecto en el state
      displatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "hubo un error",
        categoria: "alerta-error",
      };
      displatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };

  //selecciona el proyecto que el usuario dio click
  const proyectoActual = (proyectoId) => {
    displatch({
      type: PROYECTO_ACUAL,
      payload: proyectoId,
    });
  };

  //elimina un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      displatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "hubo un error",
        categoria: "alerta-error",
      };
      displatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };
  //validar formulario por errores
  const mostrarError = () => {
    displatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
