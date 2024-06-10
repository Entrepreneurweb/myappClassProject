import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../Data/EnvData/EnvVariablesProvider';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

export default function GetNotification() {
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

    useEffect(() => {
        getNotification();
    }, []);

    useEffect(() => {
        console.log("my notifs", notification);
    }, [notification]);

    return (
        <Container style={{ width:"80%"  , textAlign:"center" }} >
            <Typography  style={{ color:"white" }} variant="h4" component="h1" gutterBottom>
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
                                        {notif.content}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Issued Date: {notif.issuedDate}
                                    </Typography>
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
    );
}
