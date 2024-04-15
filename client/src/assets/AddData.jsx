import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddData() {
  const [bookName, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState({});

  const handleBook = (event) => {
    setBook(event.target.value);
  };
  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleRating = (event) => {
    setRating(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!bookName) {
      errors.bookName = "Book Name is required";
    }
    if (!author) {
      errors.author = "Author is required";
    }
    if (!publicationYear) {
      errors.publicationYear = "Publication Year is required";
    }
    if (!image) {
      errors.image = "Image link is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (!rating) {
      errors.rating = "Rating is required";
    }

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3000/postdata", {
          bookName,
          author,
          publicationYear,
          image,
          description,
          rating,
        })
        .then(() => navigate("/home"))
        .catch((err) => console.log(err));
    } else {
      setErrors(errors);
      alert("Please fill out all fields");
    }
  };

  const handleGoBack = () => {
    navigate("/home");
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
        error={!!errors.bookName}
        helperText={errors.bookName}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        onChange={handleAuthor}
        value={author}
        required
        error={!!errors.author}
        helperText={errors.author}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Publication Year"
        variant="outlined"
        onChange={handleYear}
        value={publicationYear}
        required
        error={!!errors.publicationYear}
        helperText={errors.publicationYear}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Image(Drop the link!)"
        variant="outlined"
        onChange={handleImage}
        value={image}
        required
        error={!!errors.image}
        helperText={errors.image}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        onChange={handleDescription}
        value={description}
        required
        error={!!errors.description}
        helperText={errors.description}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Rating"
        variant="outlined"
        onChange={handleRating}
        value={rating}
        required
        error={!!errors.rating}
        helperText={errors.rating}
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
