import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem ';
const ProgressList = ({ archivos }) => {
  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {archivos.map((archivo, index) => (
        <ProgressItem archivo={archivo} key={index} />
      ))}
    </ImageList>
  );
};

export default ProgressList;
