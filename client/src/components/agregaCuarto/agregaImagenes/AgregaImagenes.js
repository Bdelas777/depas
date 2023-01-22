import React from "react";
import { Paper } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import ProgressList from "./progressList/ProgressList ";
import ImagesList from "./ImageList"

const AgregaImagenes = () => {
    const [archivos, setArchivos] = useState([]);
    const onDrop = useCallback((aceptadosArchivos) => {
        setArchivos(aceptadosArchivos);
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
      });
  return (
    <>
    <Paper
      sx={{
        cursor: "pointer",
        background: "#fafafa",
        color: "#bdbdbd",
        border: "1px dashed #ccc",
        "&:hover": { border: "1px solid #ccc" },
      }}
    >
      <div style={{ padding: "16px" }} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
            <p style={{ color: 'green' }}>Pon tus archivos aqui...</p>
          ) : (
            <p>Arrastra 'n' pon algunos archivos aqui, o haz click en los archivos seleccionados</p>
          )}
          <em>(imagenes con *.jpeg, *.png, *.jpg de extension seran aceptadas)</em>
      </div>
    </Paper>
        < ProgressList {...{ archivos }} />
        <ImagesList />
        </>
  );
};

export default AgregaImagenes;
