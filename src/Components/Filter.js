import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,  FormLabel, Radio, RadioGroup, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { TriContext } from '../Data/Context/TriContext';

function BookFilterDialog({ open, onClose }) {
  const [sortBy, setSortBy] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [genres, setGenres] = useState("");
  const { TriPrice, TriGenre, SetTriGenreFunction , SetTriPriceFunction, setSearchTextFunction}= useContext(TriContext);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleGenreChange = (event) => {
    const selectedGenres = event.target.value;
    setGenres(selectedGenres);
  };

  const handleClose = () => {
    onClose();
  };

  const handleApply = () => {
    // Appliquer les filtres
    SetTriPriceFunction(maxPrice);
    SetTriGenreFunction(genres);


    onClose();
  };

  const handleReset =()=>{
    SetTriPriceFunction(0);
    SetTriGenreFunction("");
    setSearchTextFunction("")
    setMaxPrice(0);
    setGenres("");
    onClose();

  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Filter Books</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort By</FormLabel>
          <RadioGroup aria-label="sort-by" name="sort-by" value={sortBy} onChange={handleSortByChange}>
            <FormControlLabel value="price" control={<Radio />} label="Price" />
            <FormControlLabel value="genre" control={<Radio />} label="Genre" />
          </RadioGroup>
        </FormControl>

        {sortBy === 'price' && (
          <FormControl>
            <FormLabel>Max Price</FormLabel>
            <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
          </FormControl>
        )}

        {sortBy === 'genre' && (
          <FormControl>
            <FormLabel>Genres</FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Science Fiction" onChange={handleGenreChange} value="science-fiction" />
              <FormControlLabel control={<Checkbox />} label="Fantasy" onChange={handleGenreChange} value="fantasy" />
              <FormControlLabel control={<Checkbox />} label="Mystery" onChange={handleGenreChange} value="mystery" />
            </FormGroup>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
      <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

function Filter() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <TuneIcon  style={{ width: 40, height: 40 , color:"white" }}  variant="outlined" onClick={handleOpenDialog}/>
      <BookFilterDialog open={open} onClose={handleCloseDialog} />
    </div>
  );
}

export default Filter;
