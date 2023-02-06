import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { deleteRoom } from "../../../actions/room";

const RoomsActions = ({ params }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
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
        <IconButton onClick={() => {}}>
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
