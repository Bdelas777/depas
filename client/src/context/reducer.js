const reducer = (state, action) => {
  switch (action.type) {
    // Actualizar info usuario
    case "USUARIO_ACTUALIZADO":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    //Login
    case "ABRIR_INICIAR_SESION":
      return { ...state, openLogin: true };

    case "CERRAR_INICIAR_SESION":
      return { ...state, openLogin: false };

    //Alertas
    case "ACTUALIZA_PERFIL":
      return { ...state, perfil: action.payload };
    //Perfil
    case "ACTUALIZA_ALERTA":
      return { ...state, alert: action.payload };

    //loading
    case "INICIA_CARGAR":
      return { ...state, cargando: true };

    case "TERMINA_CARGAR":
      return { ...state, cargando: false };

    // Opcion invalida
    default:
      throw new Error("No hubo acciones seleccionadas");
  }
};
export default reducer;
