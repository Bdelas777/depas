import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
  } from '@mui/material';
  import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material';
  import { useEffect, useRef, useState } from 'react';
  import ClusterMap from './mapa/ClusterMap';
  import Rooms from './cuartos/Rooms';
  import AddRoom from './agregaCuarto/AddRoom';
  
  const BotonNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(() => {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
    return (
      <Box ref={ref}>
        {
          {
            0: <ClusterMap />,
            1: <Rooms />,
            2: <AddRoom />,
          }[value]
        }
        <Paper
          elevation={3}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Mapa" icon={<LocationOn />} />
            <BottomNavigationAction label="Cuartos" icon={<Bed />} />
            <BottomNavigationAction label="Agregar" icon={<AddLocationAlt />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  };
  
  export default BotonNav;