import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import { grey } from "@mui/material/colors";
import UsersActions from "./UsersActions";

const Usuarios = ({ setSelectedLink, link }) => {
  const {
    state: { usuarios },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (usuarios.length === 0) getUsers(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Nombre", width: 170 },
      { field: "email", headerName: "Correo", width: 200 },
      {
        field: "role",
        headerName: "Rol",
        width: 100,
        type: "singleSelect",
        valueOptions: ["basic", "editor", "admin"],
        editable: true,
      },
      {
        field: "active",
        headerName: "Activar",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Fecha de creación",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", headerName: "Id", width: 220 },
      {
        field: "actions",
        headerName: "Acciones",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
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
        Manejo de Usuarios
      </Typography>
      <DataGrid
        columns={columns}
        rows={usuarios}
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
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default Usuarios;
