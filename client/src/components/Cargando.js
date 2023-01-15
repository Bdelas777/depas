import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useValue } from '../context/ContextProvider';

const Cargando = () => {
  const {
    state: { cargando },
  } = useValue();
  return (
    <Backdrop open={cargando} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  )
}

export default Cargando