
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
    dispatch({ type: 'INICIA_CARGAR' });
    // mandamos la respuesta con fetch
    const result = await fetchData(
        { url: url + '/register', body: user },
        dispatch
      );
      if (result) {
        dispatch({ type: 'USUARIO_ACTUALIZADO', payload: result });
        dispatch({ type: 'CERRAR_INICIAR_SESION' });
        dispatch({
          type: 'ACTUALIZA_ALERTA',
          payload: {
            open: true,
            severity: 'success',
            message: 'Tu cuenta se ha creado exitosamente',
          },
        });
      }
    dispatch({ type: 'TERMINA_CARGAR' });
};

export const login = async (user, dispatch) => {
  dispatch({ type: 'INICIA_CARGAR' });

  const result = await fetchData({ url: url + '/login', body: user }, dispatch);
  if (result) {
    dispatch({ type: 'USUARIO_ACTUALIZADO', payload: result });
    dispatch({ type: 'CERRAR_INICIAR_SESION' });
  }

  dispatch({ type: 'TERMINA_CARGAR' });
};