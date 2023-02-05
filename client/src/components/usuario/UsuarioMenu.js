import { Dashboard, Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";

import Perfil from "./Perfil";
import { useNavigate } from 'react-router-dom';

const UsuarioMenu = ({ anchorUsuarioMenu, setAnchorUsuarioMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUsuarioMenu = () => {
    setAnchorUsuarioMenu(null);
  };

  const navigate = useNavigate();

  return (
    <>
    <Menu
      anchorEl={anchorUsuarioMenu}
      open={Boolean(anchorUsuarioMenu)}
      onClose={handleCloseUsuarioMenu}
      onClick={handleCloseUsuarioMenu}
    >
      {!currentUser.google &&
         <MenuItem
         onClick={() =>
           dispatch({
             type: "ACTUALIZA_PERFIL",
             payload: {
               open: true,
               file: null,
               photoURL: currentUser?.photoURL,
             },
           })
         }
       >
         <ListItemIcon>
           <Settings fontSize="small" />
         </ListItemIcon>
         Perfil
       </MenuItem>
      }
      {/* Te manda al  dashboard */}
      <MenuItem onClick={() => navigate('dashboard')}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>

      <MenuItem
        onClick={() => dispatch({ type: "USUARIO_ACTUALIZADO", payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Cerrar Sesion
      </MenuItem>
    </Menu>
    <Perfil />
    </>
  );
};

export default UsuarioMenu;
