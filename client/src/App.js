
import React from 'react'
import NavBar from './components/NavBar'
import Notificaciones from './components/Notificaciones'
import Login from './components/usuario/Login'
import Cargando from './components/Cargando'

function App() {
  return (
    <>
    <Cargando />
    <Notificaciones />
    <Login />
    <NavBar />
    </>
  )
}

export default App