import { React, useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const CampoClave = ({ passwordRef, id='password',label='Contraseña', }) => {
    const [muestraPassword, setMuestraPassword] = useState(false)

    const handleClick = () => {
        setMuestraPassword(!muestraPassword);
      };
    
      const handleMouseDown = (e) => {
        e.preventDefault();
      };
    
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={muestraPassword ? 'text' : 'password'}
      fullWidth
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {muestraPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CampoClave;
