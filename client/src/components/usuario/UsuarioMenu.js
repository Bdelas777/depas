import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const UsuarioMenu = ({ anchorUsuarioMenu, setAnchorUsuarioMenu }) => {
  const { dispatch } = useValue();
  const handleCloseUsuarioMenu = () => {
    setAnchorUsuarioMenu(null);
  };

  return (
    <Menu
      anchorEl={anchorUsuarioMenu}
      open={Boolean(anchorUsuarioMenu)}
      onClose={handleCloseUsuarioMenu}
      onClick={handleCloseUsuarioMenu}
    >
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Perfil
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
  );
};

export default UsuarioMenu;
