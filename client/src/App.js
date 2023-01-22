
import React from 'react'
import NavBar from './components/NavBar'
import Notificaciones from './components/Notificaciones'
import Login from './components/usuario/Login'
import Cargando from './components/Cargando'
import BotonNav from './components/BotonNav'
function App() {
  return (
    <>
    <Cargando />
    <Notificaciones />
    <Login />
    <NavBar />
    <BotonNav />
    </>
  )
}

export default App