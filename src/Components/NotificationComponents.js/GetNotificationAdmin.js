import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../Data/EnvData/EnvVariablesProvider';
import { Card, CardContent, Typography, Grid, Container, IconButton } from '@mui/material';
import SendNotification from './SendNotification';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function GetNotificationAdmin() {
    const [notification, setNotification] = useState([]);

    const getNotification = async () => {
        try {
            const response = await axios.get(`${backendUrl}/GetNotification`);
            console.log(response.data);
            setNotification(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(`Deleting notification with id: ${id}`);
            const response = await axios.post(`${backendUrl}/DeleteNotification`, {
                id
            }, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getNotification();
    }, []);

    useEffect(() => {
        console.log("my notifs", notification);
    }, [notification]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <div style={{ marginBottom: "20px", width: "100%", textAlign: "center" }}>
                <SendNotification />
            </div>
            <Container style={{ width: "100%" }}>
                <Typography style={{ color: "white" }} variant="h4" component="h1" gutterBottom>
                    Notifications
                </Typography>
                <Grid container spacing={2}>
                    {notification.length > 0 ? (
                        notification.map((notif) => (
                            <Grid item xs={12} sm={6} md={4} key={notif.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {notif.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {notif.content} {notif.id}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Issued Date: {notif.issuedDate}
                                        </Typography>
                                        <div onClick={() => handleDelete(notif.id)}>
                                            <IconButton aria-label="delete">
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                No notifications available
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
}
