import { useContext } from "react";
import { Box, Stack, Typography, Button, Icon } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Typewriter } from 'react-simple-typewriter';
import Logo from "./Logo";
import { UserContext } from "../Context/main";
import NavigationBar from "../Navigation/NavigationBar";
import "./Home.css";

// Custom 42 Icon Component
const FortyTwoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 3H20V7H16V3Z" fill="currentColor" />
    <path d="M16 17H20V21H16V17Z" fill="currentColor" />
    <path d="M4 3H8V7H4V3Z" fill="currentColor" />
    <path d="M4 17H8V21H4V17Z" fill="currentColor" />
    <path d="M4 10H8V14H4V10Z" fill="currentColor" />
    <path d="M16 10H20V14H16V10Z" fill="currentColor" />
    <path d="M10 7H14V17H10V7Z" fill="currentColor" />
  </svg>
);

// Hero Section Component
const Hero = () => {
  const typewriterWords = ['click', 'move', 'decision'];

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      maxWidth: "800px",
      textAlign: { xs: "center", lg: "left" },
    }}>
      <Typography sx={{
        fontFamily: "Anta",
        fontSize: { xs: "2rem", md: "2.5rem", lg: "3.5rem" },
        fontWeight: "bold",
        color: "#fcfcf6",
        lineHeight: 1.2,
      }}>
        Embark on a journey where every{' '}
        <span className='text-change-color'>
          <Typewriter
            words={typewriterWords}
            loop={0}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={4000}
          />
        </span>
        <br />
        shapes your destiny.
      </Typography>
    </Box>
  );
};

// Login Card Component
const LoginCard = () => {
  const googleUrl = `${process.env.REACT_APP_API_URL}/auth/google`;
  const fortyTwoUrl = `${process.env.REACT_APP_API_URL}/auth/42`;

  const buttonStyles = {
    fontSize: '1rem',
    padding: '12px',
    borderRadius: '12px',
    textTransform: 'none',
    fontFamily: 'Rubik',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  };

  return (
    <Box sx={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      width: '100%',
      maxWidth: '400px',
    }}>
      <Stack spacing={1} textAlign="center" mb={3}>
        <Typography variant="h4" sx={{
          fontFamily: 'Anta',
          color: '#fff',
          fontWeight: 700
        }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Rubik'
        }}>
          Choose your login method to continue
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          href={googleUrl}
          sx={{
            ...buttonStyles,
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            '&:hover': {
              backgroundColor: '#1a1a1a',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            },
          }}
        >
          Continue with Google
        </Button>

        <Button
          variant="contained"
          startIcon={
            <img src="/static/intra.png" className="w-7 h-7" />
          }
          href={fortyTwoUrl}
          sx={{
            ...buttonStyles,
            backgroundColor: '#fff',
            color: '#000',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
            },
          }}
        >
          Continue with Intra 42
        </Button>
      </Stack>
    </Box>
  );
};

// Main Login Page Component
export default function LoginPage() {
  const AuthUser = useContext(UserContext);

  return (
    <Box sx={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#151515',
    }}>
      {/* Background Animation Elements */}
      <div id="animated-circle">
        <div id="animated-circle-child"></div>
      </div>

      {/* Main Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Logo Header */}
        <Box sx={{ p: 4 }}>
          <Logo />
        </Box>

        {/* Hero and Login Section */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 3, lg: 8 },
          px: { xs: 2, lg: 4 },
          pb: 4,
        }}>
          <Hero />
          <LoginCard />
        </Box>
      </Box>

      {/* Navigation Bar (if logged in) */}
      {AuthUser.isLoggedIn && <NavigationBar />}
    </Box>
  );
}