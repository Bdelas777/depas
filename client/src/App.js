import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Cargando from "./components/Cargando";
import Notificaciones from "./components/Notificaciones";
import Room from "./components/cuartos/Room";

const App = () => {
  return (
    <>
      <Cargando />
      <Notificaciones />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Room />
    </>
  );
};

export default App;
