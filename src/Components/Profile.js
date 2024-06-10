import React, { useEffect, useState } from 'react';
import { Box, Avatar, TextField, Button, Card, CardContent, Typography, Grid  } from '@mui/material';
import { styled } from '@mui/system';
import profileImage from "../Ressources/Images/Profil.png"
import axios from 'axios';
import backendUrl from '../Data/EnvData/EnvVariablesProvider';

const Decoration = styled('svg')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: -1,
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  padding: 30, // Ajoute du padding
  borderRadius: 20,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: 20,
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150, // Augmente la taille de l'avatar
  height: 150, // Augmente la taille de l'avatar
  margin: '0 auto 20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Ajoute une ombre
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
    margin: '0 auto 10px',
  },
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: '#f4f4f4', // Ajoute une couleur de fond légère
}));

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Cameron Williamson',
    email: 'cameron.williamson@example.com',
    password: '********',
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    // Enregistre les modifications ici (par exemple, en envoyant les données à un serveur)
    setIsEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const SetUserData =(val1 , val2)=>{
  setProfileData({
    name: val1,
    email: val2,
    password: '********',
  })

}
  
  const GetUser= async ()=>{
    const user = await axios.get( backendUrl+"/GetUser", { withCredentials:true }  ).then(
      (response)=>{
        console.log(" email :"+response.data.email+" name :"+ response.data.name );
        SetUserData( response.data.name, response.data.email  )
      }
    )
  }
  useEffect( ()=>{
    GetUser();
  } , [] );
   

  const HandleLogOut = async ()=>{
try {
  await axios.post(backendUrl+"/LogOut" ,{}, { withCredentials: true }).then( (response)=>{
    console.log(response.data);
  })
  
  
} catch (error) {
  console.log(error)
}

  }
const EditProfile = async ()=>{
  try {
    await axios.post(backendUrl+"/EditUserProfile" , )
    
  } catch (error) {
    console.log(error)
  }
}
  return (
    <ProfileContainer>
      <Decoration xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#007bff" fillOpacity="1" d="M0,32L120,58.7C240,85,480,139,720,138.7C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
      </Decoration>
      <ProfileCard>
        <CardContent>
          <ProfileAvatar alt="Profile" src={profileImage} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {!isEditable ? (
                <>
                <Button variant="contained" color="primary" fullWidth onClick={handleEditClick}>
                  Edit
                </Button>
                <Button 
          variant="contained" 
        fullWidth 
          onClick={HandleLogOut} 
           style={{ backgroundColor: 'red', color: 'white' , marginTop:"10px" }}
>
    Logout
</Button>

                 
                
                </>
              ) : (
                <Button variant="contained" color="primary" fullWidth onClick={EditProfile}>
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;