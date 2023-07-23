import fetchData from "./utils/fetchData";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "../firebase/uploadFile";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const register = async (user, dispatch) => {
  dispatch({ type: "INICIA_CARGAR" });
  // mandamos la respuesta con fetch
  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "USUARIO_ACTUALIZADO", payload: result });
    dispatch({ type: "CERRAR_INICIAR_SESION" });
    dispatch({
      type: "ACTUALIZA_ALERTA",
      payload: {
        open: true,
        severity: "success",
        message: "Tu cuenta se ha creado exitosamente",
      },
    });
  }
  dispatch({ type: "TERMINA_CARGAR" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "INICIA_CARGAR" });

  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "USUARIO_ACTUALIZADO", payload: result });
    dispatch({ type: "CERRAR_INICIAR_SESION" });
  }

  dispatch({ type: "TERMINA_CARGAR" });
};

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: "INICIA_CARGAR" });

  const { name, file } = updatedFields;
  let body = { name };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      // Usamos firebase para subir los archivos
      const photoURL = await uploadFile(
        file,
        `perfil/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + "/updateProfile",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "USUARIO_ACTUALIZADO",
        payload: { ...currentUser, ...result },
      });
      dispatch({
        type: "ACTUALIZA_ALERTA",
        payload: {
          open: true,
          severity: "success",
          message: "Tu perfil se ha actualizado exitosamente",
        },
      });
      dispatch({
        type: "ACTUALIZA_PERFIL",
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: "ACTUALIZA_ALERTA",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "TERMINA_CARGAR" });
};

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "ACTUALIZA_USUARIOS", payload: result });
  }
};

export const updateStatus = (updatedFields, userId, dispatch, currentUser) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: "PATCH",
      token: currentUser.token,
      body: updatedFields,
    },
    dispatch
  );
};

export const logout = (dispatch) => {
  dispatch({ type: "USUARIO_ACTUALIZADO", payload: null });
  dispatch({ type: "RESETEA_CUARTO" });
  dispatch({ type: "ACTUALIZA_USUARIOS", payload: [] });
};
