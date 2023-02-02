import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Close, StarBorder } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Room = () => {

  const {
    state: { cuarto },
    dispatch,
  } = useValue();

  const [lugar, setLugar] = useState(null);

  useEffect(() => {
    if (cuarto) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cuarto.lng},${cuarto.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setLugar(data.features[0]));
    }
  }, [cuarto]);

  const handleClose = () => {
    dispatch({ type: 'ACTUALIZA_CUARTO', payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(cuarto)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar  position="relative">
        <Toolbar>
        <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {cuarto?.titulo}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
      <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}>
             {cuarto?.imagenes?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="cuarto" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={cuarto?.uName || ''}
            sx={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              zIndex: 2,
            }}
          >
            <Avatar src={cuarto?.uPhoto} />
          </Tooltip>
          </Swiper>
          <Stack sx={{ p: 3 }} spacing={2}>
            <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
              <Box>
              <Typography variant="h6" component="span">
                {'Precio: '}
              </Typography>
              <Typography component="span">
                {cuarto?.precio === 0 ? 'Gratis para quedarse' : '$' + cuarto?.precio}
              </Typography>
              </Box>
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Calificación: '}
              </Typography>
              <Rating
                name="room-ratings"
                defaultValue={3.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              />
            </Box>
            </Stack>
            <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Nombre del lugar: '}
              </Typography>
              <Typography component="span">{lugar?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {'Dirección: '}
              </Typography>
              <Typography component="span">{lugar?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {'Detalles: '}
            </Typography>
            <Typography component="span">{cuarto?.descripcion}</Typography>
          </Stack>
          </Stack>
      </Container>
    </Dialog>
  )
}

export default Room