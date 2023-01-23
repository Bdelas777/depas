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

    //Imagenes
    case "ACTUALIZA_IMAGENES":
      return { ...state, imagenes: [...state.imagenes, action.payload] };

    case "BORRA_IMAGENES":
      return {
        ...state,
        imagenes: state.imagenes.filter((imagen) => imagen !== action.payload),
      };

    //Detalles de cuartos
    case "ACTUALIZA_DETALLES":
      return { ...state, detalles: { ...state.detalles, ...action.payload } };

    //Mapa
    case "ACTUALIZA_LOCACION":
      return { ...state, locacion: action.payload };
      //Subida de datos
      case 'RESETEA_CUARTO':
      return {
        ...state,
        imagenes: [],
        detalles: { titulo: '', descripcion: '', precio: 0 },
        locacion: { lng: 0, lat: 0 },
      };
    // Opcion invalida
    default:
      throw new Error("No hubo acciones seleccionadas");
  }
};
export default reducer;
