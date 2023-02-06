import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getRooms } from "../../../actions/room";
import moment from "moment";
import { grey } from "@mui/material/colors";
import RoomsActions from "./RoomsActions";

const Cuartos = ({ setSelectedLink, link }) => {
  const {
    state: { cuartos },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (cuartos.length === 0) getRooms(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "imagenes",
        headerName: "Fotografías",
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.imagenes[0]} variant="rounded" />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "precio",
        headerName: "Precio",
        width: 70,
        renderCell: (params) => "$" + params.row.precio,
      },
      { field: "titulo", headerName: "Titulo", width: 170 },
      { field: "descripcion", headerName: "Descripcion", width: 200 },
      { field: "lng", headerName: "Longitud", width: 110 },
      { field: "lat", headerName: "Latitud", width: 110 },

      {
        field: "uName",
        headerName: "Añadido por",
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: "createdAt",
        headerName: "Creador por",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", hide: true },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        width: 150,
        renderCell: (params) => <RoomsActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 450,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manejo de Cuartos
      </Typography>
      <DataGrid
        columns={columns}
        rows={cuartos}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Cuartos;
