import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useState,useEffect } from "react";
import AgregaImagenes from "./agregaImagenes/AgregaImagenes";
import AgregaLocacion from "./agregaLocacion/AgregaLocacion";
import AgregaDetalles from "./agregaDetalles/AgregaDetalles";
import { useValue } from '../../context/ContextProvider';

const AddRoom = () => {
  const {
    state: { imagenes,detalles },
  } = useValue();
  const [activaPasos, setActivaPasos] = useState(0);
  const [pasos, setPasos] = useState([
    { label: "Locacion", completed: false },
    { label: "Detalles", completed: false },
    { label: "Imagenes", completed: false },
  ]);

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
    if (detalles.titulo.length > 4 && detalles.titulo.length > 9 ) {
      if (!pasos[1].completed) setComplete(1, true);
    } else {
      if (pasos[1].completed) setComplete(1, false);
    }
  }, [detalles]);
  
  const setComplete = (index, status) => {
    setPasos((pasos) => {
      pasos[index].completed = status;
      return [...pasos];
    });
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
      <Box>
        {
          {
            0: <AgregaLocacion />,
            1: <AgregaDetalles />,
            2: <AgregaImagenes />,
          }[activaPasos]
        }
      </Box>
      <Stack
        direction="row"
        sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
      >
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
    </Container>
  );
};

export default AddRoom;
