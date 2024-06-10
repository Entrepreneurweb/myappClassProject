import React, { useContext, useEffect, useState } from 'react';
import BookCard from './BookCard';
import TuneIcon from '@mui/icons-material/Tune';
import "../CSS/CardsDisplay.css";
import Filter from './Filter';
import { GlobalContextVar } from '../Data/Context/GlobalContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import backendUrl from '../Data/EnvData/EnvVariablesProvider';
import { Link } from 'react-router-dom';
import { TriContext } from '../Data/Context/TriContext';
import { useNavigate } from 'react-router-dom';
 

export default function CardsDisplay() {
 
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { isLog, userName,data, books,SetbookFunction, SetUserNameFunction, setIsLogFunction } = useContext(GlobalContextVar);
  const [selectedBook, setSelectedBook] = useState({
    bookID: "",
    publicationDate: "",
    title: "",
    author: "",
    price:"",
  });
  const { TriPrice, TriGenre, SetTriGenreFunction , SearchText, SetTriPriceFunction}= useContext(TriContext);
  const {setIsLogAdminFunction} = useContext(GlobalContextVar);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookDetails = (book) => {
    setSelectedBook({
      bookID: book.bookID,
      publicationDate: book.publicationDate,
      title: book.title,
      author: book.author,
      price:book.price
    });
    setQuantity(1); // Reset quantity when opening dialog
    handleClickOpen();
  };

  const handleBuy = async (bookID) => {
 

    var temp = bookID;
    await axios.post(backendUrl + "/NewOrder", {
        BookID: bookID,
        Quantity: quantity,
        OrderStatus: 0,
        Price: selectedBook.Price
    }, { withCredentials: true }).then((response) => {
      console.log( "response"+response.data);
        if (response.data === "Success") {
            console.log("Success");
        } else {
            console.log("something went wrong"+response.data);
        }
    });

    handleClose();
};

useEffect( ()=>{
  console.log("triprice"+TriPrice+"tri genre "+TriGenre);
  console.log("search text:"+SearchText+".");
},[ ]  )

const Contain=(text1, text2)=>{
  
  var montext = ""+text1;
  var montext2 = ""+text2;

  
return montext.includes( montext2);

}
//
const IslogAdminfunction = async () => {
  try {
    const response = await axios.get(backendUrl + "/IslogAdminTest", { withCredentials: true });
    console.log("IS LOG ADMIN " + response.data);
    setIsLogAdminFunction(response.data);
  } catch (err) {
    console.log("message d'erreur " + err);
  }
};
//
useEffect(()=>{
  if (isLog) {
    IslogAdminfunction()
   // navigate("/");
  }
})
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "70%" }}>
      <a style={{ justifySelf: "center", marginBottom: "20px" }} className="fancy" href="#">
        <span className="top-key"></span>
        <span className="text">OUR BOOKS</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </a>
      <div>
        <Filter />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px',
          marginBottom: "100px"
        }}>
          {
            books.length > 0 ? (
              books.filter(  book => {
                var Genre = false;
                var Price = false;
                var Text = false;
                if( TriGenre==="" ){
                  Genre = true;
                }else{

                  Genre= ( book.genre === TriGenre ) ;
                }

                if( book.price>=TriPrice ){
                  Price= true;
                }else{
                  Price= false;
                }

                if( SearchText==="" ){
                  Text=true;
                }else{
                  
                  if( Contain( book.title, SearchText )   ){
                    Text=true;
                  }else{
                    Text=false;
                  }
                }

                  return (Price&&Genre)&&Text
               
              }               
                 
                
              ) .map((book) => (
                
                <div onClick={() =>{
                  handleBookDetails(book)
                  console.log(" image path  "+book.imagePath)

                }
                
                } key={book.bookID}>
                  <BookCard
                    PublicationDate={book.publicationDate}
                    Title={book.title}
                    Author={book.author}
                    bookID={book.bookID}
                    ImagePath={book.imagePath}
                    Price={book.price}
                  />
                </div>
              ))
            ) : (
              <h2 style={{ width: "100%", color: 'white' }}>Aucun livre n'est disponible</h2>
            )
          }
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedBook.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Author: {selectedBook.author} <br />
            Publication Date: {selectedBook.publicationDate} <br />
            Price:{selectedBook.price}<br />
            Book ID: {selectedBook.bookID}
          </DialogContentText>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }} // Minimum quantity of 1
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <div>  { isLog?<Button onClick={() => handleBuy(selectedBook.bookID)} color="primary">Buy</Button>:
          <Button   color="primary"> Buy </Button> } </div>
           
          <Button onClick={handleClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
