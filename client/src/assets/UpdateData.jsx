import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

export default function UpdateData() {
  const { index } = useParams();
  console.log(index);
  const [bookName, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  
  const handleBook = (event) => {
    setBook(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getid/${index}`
        );
        const { data } = response;
        setBook(data.bookName);
        setAuthor(data.author);
        setYear(data.publicationYear);
        setImage(data.image);
        setDescription(data.description);
        setRating(data.rating);
        console.log(index);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/putdata/${index}`, {
        bookName,
        author,
        publicationYear,
        image,
        description,
        rating,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log("Err", err));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "40ch",
          height: "3rem",
          color: "white",
          "& input": {
            color: "white",
            height: "100%",
          },
          "& .MuiInputLabel-root": {
            color: "white",
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        backgroundColor: "black",
        padding: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Book Name"
        variant="outlined"
        onChange={handleBook}
        value={bookName}
        required
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        onChange={handleAuthor}
        value={author}
        required
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Publication Year"
        variant="outlined"
        onChange={handleYear}
        value={publicationYear}
        required
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Image(Drop the link!)"
        variant="outlined"
        onChange={handleImage}
        value={image}
        required
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        onChange={handleDescription}
        value={description}
        required
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Rating"
        variant="outlined"
        onChange={handleRating}
        value={rating}
        required
      />
      <br />
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="contained" onClick={handleGoBack}>
          Home
        </Button>
      </Stack>
    </Box>
  );
}
