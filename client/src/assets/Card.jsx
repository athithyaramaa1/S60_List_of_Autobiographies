import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Modal, Box, Stack } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "./Card.css"

const DeleteConfirmationModal = ({ open, onClose, onDelete }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-modal-title"
      aria-describedby="delete-confirmation-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxWidth: 400,
        borderRadius: 8,
      }}>
        <Typography variant="h6" id="delete-confirmation-modal-title" gutterBottom sx={{ marginBottom: 2, color:'black'}}> 
          Are you sure you want to delete the book?
        </Typography>
        <Typography id="delete-confirmation-modal-description" sx={{ marginBottom: 2, color:'red'}}>
          The changes cannot be changed.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={onDelete}>
            Yes, I understand and wish to proceed
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No, I don't want to delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default function MultiActionAreaCard() {
  const [autobiographies, setAutobiographies] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);

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

  const handleDeleteClick = (id) => {
    setBookToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`http://localhost:3000/deletedata/${bookToDeleteId}`);
      setAutobiographies((prev) => prev.filter((item) => item._id !== bookToDeleteId));
      setDeleteModalOpen(false);
    } catch (err) {
      console.log("Err", err);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

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
            marginBottom: 10,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={autobiography.image}
              alt={autobiography.name}
              sx={{ objectFit: 'cover', borderRadius: '10px 10px 0 0', height: '', placeItems: "center" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'black' }}>
                Autobiography: {autobiography.bookName}
              </Typography>
              <Typography gutterBottom variant="p" component="div" sx={{ color: 'blue', fontWeight: 700 }}>
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
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginTop: 'auto' }}>
            <Link to={`/home/update/${autobiography._id}`}>
              <Button variant="contained" startIcon={<UpgradeIcon />}>
                Update Book
              </Button>
            </Link>
          </Stack>
          <br />
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(autobiography._id)}>
              Delete Book
            </Button>
          </Stack>
        </Card>
      ))}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteConfirmation}
      />
    </div>
  );
}
