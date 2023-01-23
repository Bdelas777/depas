import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const MensajeAcceso = () => {
    const { dispatch } = useValue();
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Acceso prohibido</AlertTitle>
          Por favor, inicia sesion o registrate para acceder a la pagina
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            startIcon={<Lock />}
            onClick={() => dispatch({ type: 'ABRIR_INICIAR_SESION' })}
          >
           INICIAR SESION
          </Button>
        </Alert>
      </Container>
    );
}

export default MensajeAcceso