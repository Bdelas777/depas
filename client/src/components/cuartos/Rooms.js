import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';

const Rooms = () => {

  const {
    state: { filteredRooms },
    dispatch
  } = useValue();

  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filteredRooms.map((cuarto) => (
          <Card key={cuarto._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={cuarto.precio === 0 ? 'Gratis para quedarse' : '$' + cuarto.precio}
                actionIcon={
                  <Tooltip title={cuarto.uName} sx={{ mr: '5px' }}>
                    <Avatar src={cuarto.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={cuarto.imagenes[0]}
                alt={cuarto.titulo}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={()=> dispatch({type:'ACTUALIZA_CUARTO',payload:cuarto})}
              />
              <ImageListItemBar
                title={cuarto.titulo}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name="cuarto-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Rooms