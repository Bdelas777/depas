import { Mail, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import UsuarioMenu from "./UsuarioMenu";

const IconoUsuario = () => {
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUsuarioMenu, setAnchorUsuarioMenu] = useState(null);

  return (
    <Box>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title="Abrir las opciones de Usuario">
        <IconButton onClick={(e) => setAnchorUsuarioMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UsuarioMenu {...{ anchorUsuarioMenu, setAnchorUsuarioMenu }} />
    </Box>
  );
};

export default IconoUsuario;
