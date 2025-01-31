import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayerCard({ currentVideo }) {
  // Return at initial render
  if (!currentVideo) return;

  // This component was imported from the MUI page for cards
  const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="body1">
        {currentVideo.message}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {currentVideo.username}
      </Typography>
      <Typography variant="h5" component="div">
        {currentVideo.title}
      </Typography>
      <Typography variant="body2">
        {currentVideo.artist}
      </Typography>
    </CardContent>
    <CardActions>
      <ReactPlayer url={currentVideo.url} />
    </CardActions>
  </React.Fragment>
);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
