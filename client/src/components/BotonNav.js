import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { AddLocationAlt, Bed, LocationOn } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ClusterMap from "./mapa/ClusterMap";
import Rooms from "./cuartos/Rooms";
import AddRoom from "./agregaCuarto/AddRoom";
import Protegido from "./protegido/Protegido";
import { useValue } from "../context/ContextProvider";

const BotonNav = () => {
  const {
    state: { seccion },
    dispatch,
  } = useValue();
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [seccion]);
  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Rooms />,
          2: (
            <Protegido>
              <AddRoom />
            </Protegido>
          ),
        }[seccion]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={seccion}
          onChange={(e, newValue) =>
            dispatch({ type: "ACTUALIZADO_SECCION", payload: newValue })
          }
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
