import React, {useEffect} from 'react'

const Cuartos = ({ setSelectedLink, link}) => {

  useEffect(() => {
    setSelectedLink(link);
  }, [])

  return (
    <div>Cuartos</div>
  )
}

export default Cuartos