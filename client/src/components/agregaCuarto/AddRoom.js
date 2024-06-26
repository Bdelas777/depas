import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AgregaImagenes from "./agregaImagenes/AgregaImagenes";
import AgregaLocacion from "./agregaLocacion/AgregaLocacion";
import AgregaDetalles from "./agregaDetalles/AgregaDetalles";
import { useValue } from "../../context/ContextProvider";
import { Cancel, Send } from "@mui/icons-material";
import { clearRoom, createRoom, updateRoom } from "../../actions/room";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const {
    state: {
      imagenes,
      detalles,
      locacion,
      currentUser,
      updatedRoom,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();
  const [activaPasos, setActivaPasos] = useState(0);
  const [pasos, setPasos] = useState([
    { label: "Locacion", completed: false },
    { label: "Detalles", completed: false },
    { label: "Imagenes", completed: false },
  ]);

  const [showEnvio, setShowEnvio] = useState(false);

  const handleNext = () => {
    if (activaPasos < pasos.length - 1) {
      setActivaPasos((activaPasos) => activaPasos + 1);
    } else {
      const pasoIndex = findUnfinished();
      setActivaPasos(pasoIndex);
    }
  };

  const checkDisabled = () => {
    if (activaPasos < pasos.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };

  const findUnfinished = () => {
    return pasos.findIndex((paso) => !paso.completed);
  };

  useEffect(() => {
    if (imagenes.length) {
      if (!pasos[2].completed) setComplete(2, true);
    } else {
      if (pasos[2].completed) setComplete(2, false);
    }
  }, [imagenes]);

  useEffect(() => {
    if (detalles.titulo.length > 4 && detalles.titulo.length > 9) {
      if (!pasos[1].completed) setComplete(1, true);
    } else {
      if (pasos[1].completed) setComplete(1, false);
    }
  }, [detalles]);

  useEffect(() => {
    if (locacion.lng || locacion.ltd) {
      if (!pasos[0].completed) setComplete(0, true);
    } else {
      if (pasos[0].completed) setComplete(0, false);
    }
  }, [locacion]);

  const setComplete = (index, status) => {
    setPasos((pasos) => {
      pasos[index].completed = status;
      return [...pasos];
    });
  };

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showEnvio) setShowEnvio(true);
    } else {
      if (showEnvio) setShowEnvio(false);
    }
  }, [pasos]);

  const handleSubmit = () => {
    const room = {
      lng: locacion.lng,
      lat: locacion.lat,
      precio: detalles.precio,
      titulo: detalles.titulo,
      descripcion: detalles.descripcion,
      imagenes,
    };
    if (updatedRoom)
      return updateRoom(
        room,
        currentUser,
        dispatch,
        updatedRoom,
        deletedImages
      );
    createRoom(room, currentUser, dispatch);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    if (updatedRoom) {
      navigate("/dashboard/cuartos");
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
    } else {
      dispatch({ type: "ACTUALIZADO_SECCION", payload: 0 });
      clearRoom(dispatch, currentUser, imagenes);
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activaPasos}
        sx={{ mb: 3 }}
      >
        {pasos.map((paso, index) => (
          <Step key={paso.label} completed={paso.completed}>
            <StepButton onClick={() => setActivaPasos(index)}>
              {paso.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ pb: 7 }}>
        {
          {
            0: <AgregaLocacion />,
            1: <AgregaDetalles />,
            2: <AgregaImagenes />,
          }[activaPasos]
        }

        <Stack direction="row" sx={{ pt: 2, justifyContent: "space-around" }}>
          <Button
            color="inherit"
            disabled={!activaPasos}
            onClick={() => setActivaPasos((activaPasos) => activaPasos - 1)}
          >
            Volver
          </Button>
          <Button disabled={checkDisabled()} onClick={handleNext}>
            Siguiente
          </Button>
        </Stack>

        <Stack
          sx={{ alignItems: "center", justifyContent: "center", gap: 2 }}
          direction="row"
        >
          {showEnvio && (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {updatedRoom ? "Actualizar" : "Enviar"}
            </Button>
          )}
          <Button
            variant="outlined"
            endIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancelar{" "}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddRoom;
