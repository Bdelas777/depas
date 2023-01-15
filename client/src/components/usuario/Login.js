import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import CampoClave from "./CampoClave";
import GoogleLogin from "./GoogleLogin";
const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const [title, setTitle] = useState("Iniciar Sesion");
  const [estaRegistrado, setEstaRegistrado] = useState(false);
  const nombreRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpassRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CERRAR_INICIAR_SESION" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //probando cargando
    dispatch({ type: 'INICIA_CARGAR' });

    setTimeout(() => {
      dispatch({ type: 'TERMINA_CARGAR' });
    }, 6000);

    //probando notificaciones
    const password = passwordRef.current.value;
    const confirmPassword = confirmpassRef.current.value;
    if (password !== confirmPassword) {
      dispatch({
        type: "ACTUALIZA_ALERTA",
        payload: {
          open: true,
          severity: "error",
          message: "Las claves no coinciden",
        },
      });
    }
  };

  useEffect(() => {
    estaRegistrado ? setTitle("Registrarse") : setTitle("Iniciar sesion");
  }, [estaRegistrado]);

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Por favor, escribe tu información en los campos de abajo:
          </DialogContentText>
          {estaRegistrado && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              inputRef={nombreRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!estaRegistrado}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            inputProps={{ minLength: 2 }}
            required
          />
          <CampoClave {...{ passwordRef }} />
          {estaRegistrado && (
            <CampoClave
              passwordRef={confirmpassRef}
              id="confirm"
              label="Confirma tu contraseña"
            />
          )}
        </DialogContent >
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Enviar
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {estaRegistrado
          ? "¿Tienes una cuenta? Inicia Sesion"
          : "No tienes una cuenta. Crea una"}
        <Button onClick={() => setEstaRegistrado(!estaRegistrado)}>
          {estaRegistrado ? "Iniciar Sesion" : "Crear cuenta"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
