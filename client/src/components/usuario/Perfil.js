import React from "react";
import { useValue } from "../../context/ContextProvider";
import { useRef } from "react";
import { updateProfile } from "../../actions/user";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const Perfil = () => {
  const {
    state: { perfil, currentUser },
    dispatch,
  } = useValue();

  const nombreRef = useRef();

  const handleClose = () => {
    dispatch({
      type: "ACTUALIZA_PERFIL",
      payload: { ...perfil, open: false },
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: "ACTUALIZA_PERFIL",
        payload: { ...perfil, file, photoURL },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nombreRef.current.value;
    // Pasa nombre de usuario y foto en una acción
    updateProfile(currentUser, { name, file: perfil.file }, dispatch);
  };

  return (
    <Dialog open={perfil.open} onClose={handleClose}>
      <DialogTitle>
        Perfil
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
            Puedes actualizar tu perfil llenando los siguientes campos:
          </DialogContentText>
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
            defaultValue={currentUser?.name}
          />
          <label htmlFor="foto_de_perfil">
            <input
              accept="image/*"
              id="foto_de_perfil"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={perfil.photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Perfil;
