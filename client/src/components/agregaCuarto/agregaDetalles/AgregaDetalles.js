import {React, useState} from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Stack,
  Radio,
  TextField,
  InputAdornment
} from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import CampoInfo from "./CampoInfo";
const AgregaDetalles = () => {

  const {
    state: {
      detalles: { titulo, descripcion, precio },
    },
    dispatch,
  } = useValue();

  const [costo, setCosto] = useState(precio ? 1 : 0);
  
  const handleCostoChange = (e) =>{
    const costo = Number(e.target.value);
    setCosto(costo);
      if(costo === 0){
        dispatch({ type: 'ACTUALIZA_DETALLES', payload: { precio: 0 } });
      }else{
        dispatch({ type: 'ACTUALIZA_DETALLES', payload: { precio: 1 } });
      }
  }
  const handlePrecioChange =(e) =>{
    dispatch({ type: 'ACTUALIZA_DETALLES', payload: { precio: e.target.value } });
  }
  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup name="costo" value={costo} row onChange={handleCostoChange}>
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="Gratis para quedarse"
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Tarifa nominal"
          />
          {Boolean(costo) && (
            <TextField
              sx={{ width: '10ch !important' }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{ type: 'number', min: 1, max: 12000 }}
              value={precio}
              onChange={handlePrecioChange}
              name="precio"
            />
          )}
        </RadioGroup>
      </FormControl>
      <CampoInfo
        mainProps={{ name: 'titulo', label: 'Titulo', value: titulo}}
        minLength={5}
      />
      <CampoInfo
        mainProps={{
          name: 'descripcion',
          label: 'Descripcion',
          value: descripcion,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AgregaDetalles;
