import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import ReactMapGL, { Marker } from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../sidebar/GeocoderInput';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});


const ClusterMap = () => {
  const {
    state: { filteredRooms },
    dispatch,
    mapaRef
  } = useValue();

  const [puntos, setPuntos] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [limites, setLimites] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(() => {
    const puntos = filteredRooms.map((cuarto) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        cuartoId: cuarto._id,
        precio: cuarto.precio,
        titulo: cuarto.titulo,
        descripcion: cuarto.descripcion,
        lng: cuarto.lng,
        lat: cuarto.lat,
        imagenes: cuarto.imagenes,
        uPhoto: cuarto.uPhoto,
        uName: cuarto.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(cuarto.lng), parseFloat(cuarto.lat)],
      },
    }));
    setPuntos(puntos);
  }, [filteredRooms]);

  useEffect(() => {
    supercluster.load(puntos);
    setClusters(supercluster.getClusters(limites, zoom));
  }, [puntos, zoom, limites]);

  useEffect(() => {
    if (mapaRef.current) {
      setLimites(mapaRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapaRef?.current]);

  return <ReactMapGL
  initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
  mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
  mapStyle="mapbox://styles/mapbox/streets-v11"
  ref={mapaRef}
  onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
>
{clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / puntos.length) * 20}px`,
                  height: `${10 + (point_count / puntos.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapaRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`room-${cluster.properties.cuartoId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />
  </ReactMapGL>
};

export default ClusterMap;
