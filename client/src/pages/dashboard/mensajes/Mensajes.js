import React, {useEffect}from 'react'

const Mensajes = ({ setSelectedLink, link}) => {

    useEffect(() => {
        setSelectedLink(link);
      }, [])

  return (
    <div>Mensajes</div>
  )
}

export default Mensajes