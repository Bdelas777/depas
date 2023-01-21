import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';

const UsuarioMenu = ({ anchorUsuarioMenu, setAnchorUsuarioMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUsuarioMenu = () => {
    setAnchorUsuarioMenu(null);
  };

  const testAuthorization = async () => {
    const url = process.env.REACT_APP_SERVER_URL + '/room';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${currentUser.token}t`,
        },
      });

      const data = await response.json();

      console.log(data);
      if (!data.success) {
        if (response.status === 401)
          dispatch({ type: 'USUARIO_ACTUALIZAD', payload: null });
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: 'ACTUALIZA_ALERTA',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <Menu
      anchorEl={anchorUsuarioMenu}
      open={Boolean(anchorUsuarioMenu)}
      onClose={handleCloseUsuarioMenu}
      onClick={handleCloseUsuarioMenu}
    >
      <MenuItem onClick={testAuthorization}>
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
