import React from 'react'
import { useValue } from '../../context/ContextProvider';
import MensajeAcceso from './MensajeAcceso';
const Protegido = ({children}) => {
    const {
        state: { currentUser },
      } = useValue();
      return currentUser ? children : <MensajeAcceso />;
}

export default Protegido