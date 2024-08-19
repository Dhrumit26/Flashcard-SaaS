'use client'

import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { db } from '/firebase'; // Ensure you import your Firebase configuration
import { doc, collection, getDoc, writeBatch } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs'; // Assuming you're using Clerk for authentication

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth(); // Get the authenticated user

  // Functions to handle dialog open/close
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }

    try {
      const userDocRef = doc(collection(db, 'users'), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert('Flashcards saved successfully!');
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 25%, #9C27B0 50%, #F50057 75%, #FF8E53 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          textShadow: '2px 2px 10px rgba(255,255,255,0.4)'
        }}>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: '5px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: '#00796B',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#004D40',
              boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{
            color: '#004D40',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  backgroundColor: '#212121',
                  color: '#FFFFFF',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  '&:hover': {
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#FFEB3B' }}>Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: '#FFEB3B' }}>Back:</Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              sx={{
                backgroundColor: '#00796B',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  backgroundColor: '#004D40',
                  boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
                }
              }}
            >
              Save Flashcards
            </Button>
          </Box>
        </Box>
      )}

      {/* Dialog for entering the set name */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ fontFamily: 'Poppins, sans-serif' }}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary" sx={{
            fontFamily: 'Poppins, sans-serif',
            backgroundColor: '#00796B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#004D40',
            }
          }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
