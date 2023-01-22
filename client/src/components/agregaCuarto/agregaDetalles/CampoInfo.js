import { Avatar, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import pendingIcon from './Iconos/progress3.svg';
import { Check } from '@mui/icons-material';

let timer; // Variable de control del tiempo

const CampoInfo = ({ mainProps, optionalProps = {}, minLength }) => {

    const { dispatch } = useValue();
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) =>{
        dispatch({
            type: 'ACTUALIZA_DETALLES',
            payload: { [e.target.name]: e.target.value },
          });
          if (!editando) setEditando(true);
          clearTimeout(timer);
          timer = setTimeout(() => {
            setEditando(false);
            if (e.target.value.length < minLength) {
              if (!error) setError(true);
              if (success) setSuccess(false);
            } else {
              if (error) setError(false);
              if (!success) setSuccess(true);
            }
          }, 1000);
    }

  return (
    <TextField
    {...mainProps}
    {...optionalProps}
    error={error}
    helperText={error && `Este campo de tener al menos ${minLength} caracteres o más`}
    color={success ? 'success' : 'primary'}
    variant="outlined"
    onChange={handleChange}
    required
    InputProps={{
      endAdornment: (
        <InputAdornment postion="end">
          {editando ? (
            <Avatar src={pendingIcon} sx={{ height: 70 }} />
          ) : (
            success && <Check color="success" />
          )}
        </InputAdornment>
      ),
    }}
    />
  )
}

export default CampoInfo