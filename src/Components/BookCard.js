import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ItachiImage from "../Ressources/Images/Itachi.jpeg"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import backendUrl from '../Data/EnvData/EnvVariablesProvider';
import { useContext } from 'react';
import { TriContext } from '../Data/Context/TriContext';
import { GlobalContextVar } from '../Data/Context/GlobalContext';

const StyledCard = styled(Card)({
  maxWidth: 345,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.3)',
  },
});

export default function BookCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const {isLogAdmin}= useContext(GlobalContextVar);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // bookID
  const DeleteBookById = async (bookId) => {
    try {
      const response = await axios.delete(`${backendUrl}/DeleteBook/${bookId}`, { withCredentials: true });
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <StyledCard   >
      <CardHeader
        
        title= {props.Title}
        
        subheader={props.PublicationDate}
      />
      <CardMedia
  component="img"
  height="194"
  style={{ objectFit: 'contain' }} // Ajoutez ce style pour l'effet "contain"
  src={`${backendUrl}/${props.ImagePath}`}
  alt="Paella dish"
/>
       
      <CardActions disableSpacing>
  <IconButton aria-label="add to favorites" style={{ marginRight: 'auto', marginLeft: 'auto' }}>
    
   <AddShoppingCartIcon />
   
  </IconButton>
  <IconButton aria-label="share" style={{ marginRight: 'auto', marginLeft: 'auto' }}>
   { 
    isLogAdmin?<div onClick={()=>{
      if (window.confirm("Are you sure you want to delete the book"+props.Title+"?")) {
        DeleteBookById(props.bookID);
      }
  
     }}  >
     <DeleteForeverIcon />
     </div>:<ThumbUpIcon/>
    }
  </IconButton>
</CardActions>

    </StyledCard>
  );
}
