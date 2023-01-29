import { Box, Slider, Typography } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';
const marks = [
    { value: 0, label: '$0' },
    { value: 6000, label: '$6000' },
    { value: 12000, label: '$12000' },
  ];

const PrecioSlider = () => {

    const {
        state: { filtroPrecio },
        dispatch,
      } = useValue();
      
  return (
    <Box sx={{ mt: 5 }}>
            <Typography>
                Precio mayor:  {'$ ' + filtroPrecio}
            </Typography>
            <Slider
        min={0}
        max={12000}
        defaultValue={12000}
        valueLabelDisplay="auto"
        marks={marks}
        value={filtroPrecio}
        onChange={(e, precio) =>
          dispatch({ type: 'FILTRO_PRECIO', payload: precio })
        }
      />
    </Box>
  )
}

export default PrecioSlider