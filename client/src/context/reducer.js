const reducer = (state, action) => {
  switch (action.type) {
    case "USUARIO_ACTUALIZADO":
      return { ...state, currentUser: action.payload };

    case "ABRIR_INICIAR_SESION":
      return { ...state, openLogin: true };
      
    case "CERRAR_INICIAR_SESION":
      return { ...state, openLogin: false };

    case "ACTUALIZA_ALERTA":
      return { ...state,  alert: action.payload };

    case "INICIA_CARGAR":
      return { ...state, cargando: true };
      
    case "TERMINA_CARGAR":
      return { ...state, cargando: false };

    default:
      throw new Error("No hubo acciones seleccionadas");
  }
};
export default reducer;
