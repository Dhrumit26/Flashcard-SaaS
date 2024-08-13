import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Home() {

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error handling checkout:', error);
    }
  };

  return (
    <>
      {/* Header and Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
        >
          Learn More
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Easy Flashcard Creation
              </Typography>
              <Typography>
                Generate flashcards in seconds using our simple and intuitive interface.
              </Typography>
            </Paper>
          </Grid>
          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Customizable Designs
              </Typography>
              <Typography>
                Choose from various templates and themes to make your flashcards stand out.
              </Typography>
            </Paper>
          </Grid>
          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Seamless Integration
              </Typography>
              <Typography>
                Integrate your flashcards with other platforms and tools for a smoother learning experience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Basic Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h5" gutterBottom>
                $10/month
              </Typography>
              <Typography>
                - Access to basic flashcard creation tools<br />
                - Limited customization options<br />
                - Email support
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Plan
              </Button>
            </Paper>
          </Grid>
          {/* Pro Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h5" gutterBottom>
                $20/month
              </Typography>
              <Typography>
                - All Basic plan features<br />
                - Advanced customization<br />
                - Priority email support<br />
                - Integrations with other platforms
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                
              >
                Choose Plan
              </Button>
            </Paper>
          </Grid>
          {/* Enterprise Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Enterprise
              </Typography>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography>
                - All Pro plan features<br />
                - Custom solutions<br />
                - Dedicated account manager<br />
                - 24/7 priority support
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Contact Sales
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
