import deleteImages from "./utils/deleteImages";
import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/room";

export const createRoom = async (room, currentUser, dispatch) => {
  dispatch({ type: "INICIA_CARGAR" });

  const result = await fetchData(
    { url, body: room, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "ACTUALIZA_ALERTA",
      payload: {
        open: true,
        severity: "success",
        message: "El cuarto ha sido agregado, exitosamente",
      },
    });
    clearRoom(dispatch, currentUser);
    dispatch({ type: "ACTUALIZADO_SECCION", payload: 0 });
    dispatch({ type: "ACTUALIZA_CUARTO", payload: result });
  }

  dispatch({ type: "TERMINA_CARGAR" });
};

export const getRooms = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "ACTUALIZA_CUARTOS", payload: result });
  }
};

export const deleteRoom = async (room, currentUser, dispatch) => {
  dispatch({ type: "INICIA_CARGAR" });

  const result = await fetchData(
    { url: `${url}/${room._id}`, method: "DELETE", token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "ACTUALIZA_ALERTA",
      payload: {
        open: true,
        severity: "success",
        message: "The room has been deleted successfully",
      },
    });

    dispatch({ type: "ELIMINA_CUARTO", payload: result._id });
    deleteImages(room.images, room.uid);
  }

  dispatch({ type: "TERMINA_CARGAR" });
};

export const updateRoom = async (
  room,
  currentUser,
  dispatch,
  updatedRoom,
  deletedImages
) => {
  dispatch({ type: "INICIA_CARGAR" });

  const result = await fetchData(
    {
      url: `${url}/${updatedRoom._id}`,
      method: "PATCH",
      body: room,
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "ACTUALIZA_ALERTA",
      payload: {
        open: true,
        severity: "success",
        message: "El cuarto sea actualizado exitosamente",
      },
    });

    clearRoom(dispatch, currentUser, deletedImages, updatedRoom);
    dispatch({ type: "ACTUALIZADO_SECCION", payload: 0 });
    dispatch({ type: "ACTUALIZA_CUARTO", payload: result });
  }

  dispatch({ type: "TERMINA_CARGAR" });
};

export const clearRoom = (
  dispatch,
  currentUser,
  imagenes = [],
  updatedRoom = null
) => {
  dispatch({ type: "RESETEA_CUARTO" });
  localStorage.removeItem(currentUser.id);
  if (updatedRoom) {
    deleteImages(imagenes, updatedRoom.uid);
  } else {
    deleteImages(imagenes, currentUser.id);
  }
};

export const storeRoom = (
  locacion,
  detalles,
  imagenes,
  updatedRoom,
  deletedImages,
  addedImages,
  userId
) => {
  if (
    locacion.lng ||
    locacion.lat ||
    detalles.precio ||
    detalles.titulo ||
    detalles.descripcion ||
    imagenes.length
  ) {
    localStorage.setItem(
      userId,
      JSON.stringify({
        locacion,
        detalles,
        imagenes,
        updatedRoom,
        deletedImages,
        addedImages,
      })
    );
    return true;
  } else {
    return false;
  }
};
