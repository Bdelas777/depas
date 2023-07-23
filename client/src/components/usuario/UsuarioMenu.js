import { Dashboard, Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { React, useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import { logout } from "../../actions/user";
import Perfil from "./Perfil";
import { useNavigate } from "react-router-dom";
import { storeRoom } from "../../actions/room";

const UsuarioMenu = ({ anchorUsuarioMenu, setAnchorUsuarioMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: {
      currentUser,
      locacion,
      detalles,
      imagenes,
      updatedRoom,
      deletedImages,
      addedImages,
    },
  } = useValue();
  const handleCloseUsuarioMenu = () => {
    setAnchorUsuarioMenu(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    storeRoom(
      locacion,
      detalles,
      imagenes,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser.id
    );
    logout(dispatch);
  };

  useEffect(() => {
    const storeBeforeLeave = (e) => {
      if (
        storeRoom(
          locacion,
          detalles,
          imagenes,
          updatedRoom,
          deletedImages,
          addedImages,
          currentUser.id
        )
      ) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    window.addEventListener("beforeunload", storeBeforeLeave);
    return () => window.removeEventListener("beforeunload", storeBeforeLeave);
  }, [locacion, detalles, imagenes]);

  return (
    <>
      <Menu
        anchorEl={anchorUsuarioMenu}
        open={Boolean(anchorUsuarioMenu)}
        onClose={handleCloseUsuarioMenu}
        onClick={handleCloseUsuarioMenu}
      >
        {!currentUser.google && (
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
        )}
        {/* Te manda al  dashboard */}
        <MenuItem onClick={() => navigate("dashboard")}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Panel
        </MenuItem>

        <MenuItem onClick={handleLogout}>
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
