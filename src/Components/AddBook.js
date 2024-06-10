import React, { useEffect, useState } from 'react';
import { TextField, Button, Box,Input, Typography, createTheme, ThemeProvider, CssBaseline, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import backendUrl from '../Data/EnvData/EnvVariablesProvider';
import { GlobalContextVar } from '../Data/Context/GlobalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    description: '',
    genre: '',
    stock: '',
  });

  const { isLogAdmin } = useContext(GlobalContextVar);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('isbn', bookData.isbn);
    formData.append('price', bookData.price);
    formData.append('description', bookData.description);
    formData.append('genre', bookData.genre);
    formData.append('stock', bookData.stock);
    formData.append('image', e.target.image.files[0]); // Ajouter l'image sélectionnée

    try {
      const response = await axios.post(`${backendUrl}/AddBook`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(" submission response ", response.data);
      // Réinitialiser le formulaire après soumission réussie
      setBookData({
        title: '',
        author: '',
        isbn: '',
        price: '',
        description: '',
        genre: '',
        stock: '',
      });
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire!', error);
    }
  };

  useEffect(() => {
    console.log("Test de connexion en tant qu'administrateur:", isLogAdmin);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{ marginTop: "50px" }}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" gutterBottom>
          Ajouter un nouveau livre
        </Typography>
        <TextField
          label="Titre"
          variant="outlined"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          required
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          name="image"
          required
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Télécharger l'image
          </Button>
        </label>
        <TextField
          label="Auteur"
          variant="outlined"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          required
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="ISBN"
          variant="outlined"
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
          required
          type="number"
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="Prix"
          variant="outlined"
          name="price"
          value={bookData.price}
          onChange={handleChange}
          required
          type="number"
          inputProps={{ step: '0.01' }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={bookData.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <FormControl variant="outlined" sx={{ m: 1, width: '100%' }} required>
          <InputLabel style={{ color: '#ffffff' }}>Genre</InputLabel>
          <Select
            label="Genre"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            style={{ color: '#ffffff' }}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value="Science Fiction">Science Fiction</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Mystère">Mystère</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Stock"
          variant="outlined"
          name="stock"
          value={bookData.stock}
          onChange={handleChange}
          required
          type="number"
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, width: '50%' }}>
          Soumettre
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default AddBook;
