import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import dummyData from './dummyData';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ 
      maxWidth: 345,
      backgroundColor: 'darkorange',
      borderRadius: 10,
      border: '2px solid lightyellow',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={dummyData.image}
          alt="Malala Yousufzai"
          sx={{ objectFit: 'cover', borderRadius: '10px 10px 0 0', height: '', placeItems:"center" }} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
            Autobiography: {dummyData.bookName}
          </Typography>
            

          <Typography gutterBottom variant="p" component="div" sx={{ color: 'white' }}>
            Author: {dummyData.author}
          </Typography>

          <Typography gutterBottom variant="p" component="div" sx={{ color: 'white' }}>
            Publication Year: {dummyData.publicationYear}
          </Typography>
          <br />

          <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
            Description: {dummyData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" sx={{ color: 'white' }}>
          Rating:
        </Button>
        <Button size="small" color="primary" sx={{ color: 'white' }}>
          {dummyData.rating}
        </Button>
      </CardActions>
    </Card>
  );
}
