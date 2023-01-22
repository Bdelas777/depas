import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "./Geocoder";
const AgregaLocacion = () => {
  const {
    state: {
      locacion: { lng, lat },
    },
    dispatch,
  } = useValue();

  const mapaRef = useRef();

  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapaRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch({
            type: 'ACTUALIZA_LOCACION',
            payload: { lng: data.longitude, lat: data.latitude },
          });
        });
    }
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
      ref={mapaRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: "ACTUALIZA_LOCACION",
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: 'ACTUALIZA_LOCACION',
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AgregaLocacion;
