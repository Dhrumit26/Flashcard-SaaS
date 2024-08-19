"use client"
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Toolbar, Typography, Container, AppBar, Box, Grid } from "@mui/material";
import Head from 'next/head';

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: '#181818', color: '#fff', minHeight: '100vh', padding: '0', overflowX: 'hidden' }}>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="fixed" sx={{ background: 'rgba(0, 0, 0, 0.6)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{
            flexGrow: 1,
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#FFEB3B', fontWeight: 'bold' }}>Login</Button>
            <Button color="inherit" href="/sign-in" sx={{ color: '#FFEB3B', fontWeight: 'bold' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 10, pt: 8 }}>
        <Typography variant="h2" gutterBottom sx={{
          background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 25%, #9C27B0 50%, #F50057 75%, #FF8E53 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          textShadow: '2px 2px 10px rgba(255,255,255,0.4)'
        }}>
           Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#29B6F6', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' }}>
        The easiest way to make flashcards from your text
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            background: 'linear-gradient(90deg, #FF8E53 0%, #FE6B8B 100%)',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '30px',
            padding: '10px 30px',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0px 4px 20px rgba(255, 105, 135, 0.3)',
            '&:hover': {
              boxShadow: '0px 6px 30px rgba(255, 105, 135, 0.5)'
            }
          }}
          href="/generate"
        >
          Start Acing Now
        </Button>
      </Box>

      <Box sx={{ my: 8, px: 4 }}>
        <Typography variant="h4" gutterBottom sx={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
        }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              backgroundColor: '#212121',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{
                color: '#29B6F6',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Easy Text Input
              </Typography>
              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
                Simply Input Your Text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              backgroundColor: '#212121',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{
                color: '#29B6F6',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Smart Flashcards
              </Typography>
              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
                Our AI intelligently breaks down your texts into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              backgroundColor: '#212121',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{
                color: '#29B6F6',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Accessible Anywhere
              </Typography>
              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8, textAlign: 'center', px: 4 }}>
        <Typography variant="h4" gutterBottom sx={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
        }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              backgroundColor: '#1C1C1C',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{
                color: '#29B6F6',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif'
              }}>Basic</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>$5 / month</Typography>
              <Typography sx={{ color: '#FFFFFF' }}>
                Basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" sx={{
                mt: 2,
                background: 'linear-gradient(90deg, #FF8E53 0%, #FE6B8B 100%)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '30px',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0px 4px 20px rgba(255, 105, 135, 0.3)',
                '&:hover': {
                  boxShadow: '0px 6px 30px rgba(255, 105, 135, 0.5)'
                }
              }}>
                Choose Basics
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              backgroundColor: '#1C1C1C',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{
                color: '#29B6F6',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif'
              }}>Pro</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>$10 / month</Typography>
              <Typography sx={{ color: '#FFFFFF' }}>
                Unlimited access to flashcards and storage.
              </Typography>
              <Button variant="contained" sx={{
                mt: 2,
                background: 'linear-gradient(90deg, #FF8E53 0%, #FE6B8B 100%)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '30px',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0px 4px 20px rgba(255, 105, 135, 0.3)',
                '&:hover': {
                  boxShadow: '0px 6px 30px rgba(255, 105, 135, 0.5)'
                }
              }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
