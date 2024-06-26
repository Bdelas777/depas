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
      return { ...state, imagenes: [...state.imagenes, ...action.payload] };

    case "ACTUALIZA_IMAGENES_BORRADAS":
      return {
        ...state,
        deletedImages: [...state.deletedImages, ...action.payload],
      };

    case "ACTUALIZA_IMAGENES_AGREGADAS":
      return {
        ...state,
        addedImages: [...state.addedImages, ...action.payload],
      };

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
    case "RESETEA_CUARTO":
      return {
        ...state,
        imagenes: [],
        detalles: { titulo: "", descripcion: "", precio: 0 },
        locacion: { lng: 0, lat: 0 },
        actualizadoCuarto: null,
        deletedImages: [],
        addedImages: [],
      };

    case "ACTUALIZA_CUARTOS":
      return {
        ...state,
        cuartos: action.payload,
        filtroDireccion: null,
        filtroPrecio: 12000,
        filteredRooms: action.payload,
      };

    // Sidebar
    case "FILTRO_PRECIO":
      return {
        ...state,
        filtroPrecio: action.payload,
        filteredRooms: applyFilter(
          state.cuartos,
          state.filtroDireccion,
          action.payload
        ),
      };

    case "FILTRO_DIRECCION":
      return {
        ...state,
        filtroDireccion: action.payload,
        filteredRooms: applyFilter(
          state.cuartos,
          action.payload,
          state.filtroPrecio
        ),
      };

    case "LIMPIA_DIRECCION":
      return {
        ...state,
        filtroDireccion: null,
        filtroPrecior: 12000,
        filteredRooms: state.cuartos,
      };

    case "ACTUALIZA_CUARTO":
      return { ...state, cuarto: action.payload };

    // Update user
    case "ACTUALIZA_USUARIOS":
      return { ...state, usuarios: action.payload };

    // Elimina cuarto
    case "ELIMINA_CUARTO":
      return {
        ...state,
        cuartos: state.cuartos.filter(
          (cuarto) => cuarto._id !== action.payload
        ),
      };

    // Actuliza un cuarto actualizado
    case "ACTUALIZADO_CUARTO":
      return { ...state, actualizadoCuarto: action.payload };

    case "ACTUALIZADO_SECCION":
      return { ...state, seccion: action.payload };
    // Opcion invalida
    default:
      throw new Error("No hubo acciones seleccionadas");
  }
};
export default reducer;

const applyFilter = (cuartos, direccion, precio) => {
  let filteredRooms = cuartos;
  if (direccion) {
    const { lng, lat } = direccion;
    filteredRooms = filteredRooms.filter((cuarto) => {
      const lngDifference =
        lng > cuarto.lng ? lng - cuarto.lng : cuarto.lng - lng;
      const latDifference =
        lat > cuarto.lat ? lat - cuarto.lat : cuarto.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  if (precio < 12000) {
    filteredRooms = filteredRooms.filter((cuarto) => cuarto.precio <= precio);
  }

  return filteredRooms;
};
