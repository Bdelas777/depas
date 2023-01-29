import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';

const ctrl = new MapboxGeocoder({
  marker: false,
  accessToken: process.env.REACT_APP_MAP_TOKEN,
});

const GeocoderInput = () => {
  const { mapaRef, contenedorRef, dispatch } = useValue();

  useEffect(() => {
    if (contenedorRef?.current?.children[0]) {
      contenedorRef.current.removeChild(contenedorRef.current.children[0]);
    }
    contenedorRef.current.appendChild(ctrl.onAdd(mapaRef.current.getMap()));

    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch({
        type: 'FILTRO_DIRECCION',
        payload: { lng: coords[0], lat: coords[1] },
      });
    });

    ctrl.on('clear', () => dispatch({ type: 'LIMPIA_DIRECCION' }));
  }, []);
  return null;
};

export default GeocoderInput;