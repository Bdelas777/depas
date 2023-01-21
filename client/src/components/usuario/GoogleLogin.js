import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import { React,  useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import jwtDecode from 'jwt-decode';
// Para usar google es esencial este paquete
const GoogleLogin = () => {

  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const { sub: id, email, name, picture: photoURL } = decodedToken;
    dispatch({
      type: 'USUARIO_ACTUALIZADO',
      payload: { id, email, name, photoURL, token, google: true },
    });
    dispatch({ type: 'CERRAR_INICIAR_SESION' });
  };
  
  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Limpia las cookies o intenta despues!');
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: 'ACTUALIZA_ALERTA',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <Button variant="outlined" startIcon={<Google />}  disabled={disabled}
    onClick={handleGoogleLogin}>
      Iniciar sesion con Google
    </Button>
  );
};

export default GoogleLogin;
