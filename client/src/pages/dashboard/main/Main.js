import { Group, MapsHomeWork } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { getRooms } from "../../../actions/room";
import { getUsers } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";
import moment from "moment";
import CostoCuartoPastel from "./CostoCuartoPastel";
import CuartosUsuarios from "./CuartosUsuarios";

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { cuartos, usuarios },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (cuartos.length === 0) getRooms(dispatch);
    if (usuarios.length === 0) getUsers(dispatch);
  }, []);
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total de Usuarios</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{usuarios.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total de Departamentos</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{usuarios.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Usuarios agregados recientemente </Typography>
          <List>
            {usuarios.slice(0, 4).map((usuario, i) => (
              <Box key={usuario._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={usuario?.name} src={usuario?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={usuario?.name}
                    secondary={`Fue creado el: ${moment(
                      usuario?.createdAt
                    ).format("YYYY-MM-DD H:mm:ss")}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Departamentos agregados recientemente</Typography>
          <List>
            {cuartos.slice(0, 4).map((cuarto, i) => (
              <Box key={cuarto._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={cuarto?.titulo}
                      src={cuarto?.imagenes[0]}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={cuarto?.titulo}
                    secondary={`Se agrego: ${moment(
                      cuarto?.createdAt
                    ).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <CostoCuartoPastel />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <CuartosUsuarios />
      </Paper>
    </Box>
  );
};

export default Main;
