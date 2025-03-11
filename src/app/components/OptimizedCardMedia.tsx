import { useState } from 'react';
import Image from 'next/image';
import { CardMedia, Box } from '@mui/material';

const OptimizedCardMedia = ({ image, title }: {image: string, title: string}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CardMedia
      sx={{
        position: 'relative',
        height: 350,
        // paddingTop: '33.33%', // 3:1 aspect ratio
        backgroundColor: isLoaded ? 'transparent' : 'rgba(0,0,0,0.1)', // Light background while loading
      }}
    >
      <Image
        src={image}
        alt={title}
        fill
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        onLoadingComplete={() => setIsLoaded(true)}
        priority
      />
    </CardMedia>
  );
};

export default OptimizedCardMedia;