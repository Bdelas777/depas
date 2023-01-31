import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/room';

export const createRoom = async (room, currentUser, dispatch,setPage) => {
  dispatch({ type: 'INICIA_CARGAR' });

  const result = await fetchData(
    { url, body: room, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'ACTUALIZA_ALERTA',
      payload: {
        open: true,
        severity: 'success',
        message: 'El cuarto ha sido agregado, exitosamente',
      },
    });
    dispatch({ type: 'RESETEA_CUARTO' });
    setPage(0);
    dispatch({ type: 'ACTUALIZA_CUARTO' , payload:result});
  }

  dispatch({ type: 'TERMINA_CARGAR' });
};

  export const getRooms = async (dispatch) => {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if (result) {
      dispatch({ type: 'ACTUALIZA_CUARTOS', payload: result });
    }
  };
