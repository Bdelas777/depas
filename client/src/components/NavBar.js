import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Lock, Menu } from "@mui/icons-material";
import { useValue } from "../context/ContextProvider";
import IconoUsuario from "./usuario/IconoUsuario";

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit">
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            Bienvenido al sitio
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Bienvenido
          </Typography>
          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock />}
              onClick={() =>
                dispatch({ type: "ABRIR_INICIAR_SESION" })
              }
            >
              Iniciar Sesion
            </Button>
          ) : (
            <IconoUsuario />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
