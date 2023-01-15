import React from "react";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";

const GoogleLogin = () => {
  return (
    <Button variant="outlined" startIcon={<Google />}>
      Iniciar sesion con Google
    </Button>
  );
};

export default GoogleLogin;
