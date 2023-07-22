import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { deleteRoom } from "../../../actions/room";
import { useNavigate } from "react-router-dom";

const RoomsActions = ({ params }) => {
  const navigate = useNavigate();
  const { _id, lng, lat, precio, titulo, descripcion, imagenes, uid } =
    params.row;
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleEdit = () => {
    dispatch({ type: "ACTUALIZA_LOCACION", payload: { lng, lat } });
    dispatch({
      type: "ACTUALIZA_DETALLES",
      payload: { precio, titulo, descripcion },
    });
    dispatch({
      type: "ACTUALIZA_IMAGENES",
      payload: { imagenes },
    });
    dispatch({ type: "ACTUALIZADO_CUARTO", payload: { _id, uid } });
    dispatch({ type: "ACTUALIZADO_SECCION", payload: 2 });
    navigate("/");
  };
  return (
    <Box>
      <Tooltip title="Ver detalles del cuarto">
        <IconButton
          onClick={() =>
            dispatch({ type: "ACTUALIZA_CUARTO", payload: params.row })
          }
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edita este cuarto">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimina este cuarto">
        <IconButton
          onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RoomsActions;
