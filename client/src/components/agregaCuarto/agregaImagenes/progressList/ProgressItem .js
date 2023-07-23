import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../../../../firebase/uploadFileProgress";
import { useValue } from "../../../../context/ContextProvider";
const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .5)",
};

const ProgressItem = ({ archivo }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const {
    state: { currentUser, updatedRoom },
    dispatch,
  } = useValue();
  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + archivo.name.split(".").pop();
      try {
        const url = await uploadFileProgress(
          archivo,
          `rooms/${updatedRoom ? updatedRoom.uid : currentUser?.id}`,
          imageName,
          setProgress
        );

        dispatch({ type: "ACTUALIZA_IMAGENES", payload: [url] });
        if (updatedRoom)
          dispatch({ type: "ACTUALIZA_IMAGENES_AGREGADAS", payload: [url] });
        setImageURL(null);
      } catch (error) {
        dispatch({
          type: "ACTUALIZA_ALERTA",
          payload: { open: true, severity: "error", message: error.message },
        });
        console.log(error);
      }
    };
    setImageURL(URL.createObjectURL(archivo));
    uploadImage();
  }, [archivo]);
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;
