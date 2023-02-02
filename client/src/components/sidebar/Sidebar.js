import { Box, Drawer, IconButton, styled, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import PrecioSlider from "./PrecioSlider";
import { useValue } from "../../context/ContextProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
   
    const { contenedorRef } = useValue();
    
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Aplica la búsqueda o filtro:</Typography>
        <IconButton  onClick={() => setIsOpen(false)}>
            <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={contenedorRef}></Box>
        <PrecioSlider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
