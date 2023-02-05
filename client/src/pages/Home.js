import BotonNav from '../components/BotonNav';
import Cargando from '../components/Cargando';
import NavBar from '../components/NavBar';
import Notificaciones from '../components/Notificaciones';
import Room from '../components/cuartos/Room'
import Login from '../components/usuario/Login'

const Home = () => {
  return (
    <>
      <Cargando />
      <Notificaciones />
      <Login />
      <NavBar />
      <BotonNav />
      <Room />
    </>
  );
};

export default Home;