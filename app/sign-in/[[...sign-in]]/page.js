import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{
            flexGrow: 1,
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit" sx={{ color: '#FFEB3B', fontWeight: 'bold' }}>
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sign-In Section */}
      <Container maxWidth="sm" sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ 
            textAlign: 'center', 
            my: 4, 
            backgroundColor: '#212121', 
            padding: '30px', 
            borderRadius: '10px', 
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', 
            '&:hover': {
              boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{
            background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 25%, #9C27B0 50%, #F50057 75%, #FF8E53 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            textShadow: '2px 2px 10px rgba(255,255,255,0.4)'
          }}>
            Sign In
          </Typography>

          {/* Clerk SignIn component for handling sign-in process */}
          <SignIn />
        </Box>
      </Container>
    </>
  );
}
