import React, {useEffect} from 'react'

const Usuarios = ({ setSelectedLink, link}) => {

  useEffect(() => {
    setSelectedLink(link);
  }, [])
  
  return (
    <div>Usuarios</div>
  )
}

export default Usuarios