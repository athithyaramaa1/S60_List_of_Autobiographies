import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Card.css"
export default function MultiActionAreaCard() {
  const [autobiographies, setAutobiographies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await axios.get("http://localhost:3000/getdata");
        setAutobiographies(apiData.data.arr);
      } catch (err) {
        console.log("Error", err);
      }
    };
    getData();
  }, []);

  return (
    <div className='card-container'>
      {autobiographies.map((autobiography, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 345,
            backgroundColor: 'darkorange',
            borderRadius: 10,
            border: '2px solid lightyellow',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: 10, // Add margin between cards if needed
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={autobiography.image}
              alt={autobiography.name} // Assuming name is a property in your data
              sx={{ objectFit: 'cover', borderRadius: '10px 10px 0 0', height: '', placeItems: "center" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'black' }}>
                Autobiography: {autobiography.bookName}
              </Typography>

              <Typography gutterBottom variant="p" component="div" sx={{ color: 'blue', fontWeight:700 }}>
                Author: {autobiography.author}
              </Typography>

              <Typography gutterBottom variant="p" component="div" sx={{ color: 'white' }}>
                Publication Year: {autobiography.publicationYear}
              </Typography>
              <br />

              <Typography variant="body2" color="text.secondary" sx={{ color: 'brown' }}>
                Description: {autobiography.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" sx={{ color: 'white' }}>
              Rating:
            </Button>
            <Button size="small" color="primary" sx={{ color: 'yellow' }}>
              {autobiography.rating}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
