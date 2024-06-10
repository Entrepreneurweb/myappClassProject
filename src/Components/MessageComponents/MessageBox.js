import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Paper, List, ListItem, ListItemText, TextField, Button, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import backendUrl from '../../Data/EnvData/EnvVariablesProvider';
import { GlobalContextVar } from '../../Data/Context/GlobalContext';

const MessageBox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [UsersEmail, SetUsersEmail] = useState([{}]);
  const { isLogAdmin } = useContext(GlobalContextVar);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const receiverEmail = selectedConversationIndex !== null ? conversations[selectedConversationIndex].email : null;
      await SendMessage(newMessage, receiverEmail);
      setNewMessage('');
      if (selectedConversationIndex === null && receiverEmail) {
        setSelectedConversationIndex(conversations.length); // Select the new conversation
      }
    }
  };

  const SendMessage = async (messageText, receiverId) => {
    try {
      const response = await axios.post(
        backendUrl + "/SendMessage",
        { messageText, receiverId },
        { withCredentials: true }
      );
      console.log('Message sent response:', response.data);
      GetMyMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const GetMyMessages = async () => {
    try {
      const response = await axios.get(backendUrl + "/GetMyMessages", { withCredentials: true });
      console.log('Received messages:', response.data);

      const receivedMessages = response.data.receivedMessages;
      const sentMessages = response.data.sentMessages;

      const combinedConversations = {};

      // Combine received messages
      receivedMessages.forEach(conversation => {
        conversation.messages.forEach(message => {
          const otherEmail = conversation.senderEmail;
          if (!combinedConversations[otherEmail]) {
            combinedConversations[otherEmail] = {
              email: otherEmail,
              messages: []
            };
          }
          combinedConversations[otherEmail].messages.push({
            ...message,
            type: 'received'
          });
        });
      });

      // Combine sent messages
      sentMessages.forEach(conversation => {
        conversation.messages.forEach(message => {
          const otherEmail = message.receiverId;
          if (!combinedConversations[otherEmail]) {
            combinedConversations[otherEmail] = {
              email: otherEmail,
              messages: []
            };
          }
          combinedConversations[otherEmail].messages.push({
            ...message,
            type: 'sent'
          });
        });
      });

      const formattedConversations = Object.values(combinedConversations).map(conversation => ({
        ...conversation,
        messages: conversation.messages.sort((a, b) => a.messageId - b.messageId)
      }));

      setConversations(formattedConversations);
      setSelectedConversationIndex(formattedConversations.length > 0 ? 0 : null);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const GetUserEmail = async () => {
    try {
      const response = await axios.get(backendUrl + "/GetMyUsersEmail");
      SetUsersEmail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("usersEmail " + UsersEmail);
  }, [UsersEmail]);

  useEffect(() => {
    GetMyMessages();
    GetUserEmail();
  }, []);

  const handleConversationClick = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <Container style={{ marginTop: "40px" }} maxWidth="lg">
      <Grid container spacing={2}>
        {/* List of Conversations */}
        <Grid item xs={4}>
          <Paper elevation={4} sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <List component="nav">
              {conversations.map((conversation, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedConversationIndex === index}
                  onClick={() => handleConversationClick(index)}
                >
                  <ListItemText primary={conversation.email} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Display messages */}
        <Grid item xs={8}>
          <Paper elevation={4} sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {selectedConversationIndex !== null ? (
              <>
                <div style={{ overflowY: 'auto', flexGrow: 1, padding: '8px' }}>
                  {conversations[selectedConversationIndex].messages.map((message, index) => (
                    <div key={index} style={{ textAlign: message.type === 'sent' ? 'right' : 'left', margin: '8px' }}>
                      <Typography variant="body1" sx={{ display: 'inline-block', maxWidth: '70%', wordBreak: 'break-word', borderRadius: '8px', padding: '8px', backgroundColor: message.type === 'sent' ? '#DCF8C6' : '#EAEAEA' }}>
                        {message.messageText}
                      </Typography>
                    </div>
                  ))}
                </div>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button variant="contained" style={{ marginLeft: '8px' }} onClick={handleSendMessage}>
                    <SendIcon />
                  </Button>
                </div>
              </>
            ) : (
              <div style={{ padding: '8px' }}>
                <Typography variant="h6" gutterBottom>
                  No conversation selected
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" onClick={handleSendMessage} style={{ marginTop: '8px' }}>
                  Send Message
                </Button>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessageBox;
