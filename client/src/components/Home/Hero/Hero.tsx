import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InviteFriendToGame from './InviteFriendToGame';
import Lottie from 'react-lottie';
import animationData from '../Animation.json';
import { Typewriter } from 'react-simple-typewriter';
import  type { FriendsState } from '../../Context/user';

interface HeroProps {
  socket: any;
  friendsState: FriendsState;
}

const Hero = ({ socket, friendsState }: HeroProps) => {
  const [showInviteFriendToGame, setShowInviteFriendToGame] = React.useState(false);

  const handleShowInviteFriendToGame = () => {
    setShowInviteFriendToGame(true);
  };

  return (
    <>
      {showInviteFriendToGame && (
        <InviteFriendToGame
          friendsState={friendsState}
          socket={socket}
          setShowInviteFriendToGame={setShowInviteFriendToGame}
        />
      )}

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={{ xs: 4, lg: 6 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          mt: "-85px",
        //   pt: { xs: 4, md: 6 },
        }}
      >
        {/* Hero Text Section */}
        <Box sx={{ 
          maxWidth: '550px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}>
          <Typography sx={{
            fontFamily: "Anta",
            fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
            fontWeight: "bold",
            color: "#fcfcf6",
            lineHeight: 1.3,
          }}>
            Embark on a journey where every{' '}
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold',
            }}>
              <Typewriter
                words={['click', 'move', 'decision']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={4000}
              />
            </span>
            <br />
            shapes your destiny
          </Typography>

          <Button
            onClick={handleShowInviteFriendToGame}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '14px',
              padding: '14px 36px',
              textTransform: 'none',
              color: 'white',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c8ef5 0%, #8659b3 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
              },
              '&:active': {
                transform: 'translateY(-1px)',
              }
            }}
          >
            <Typography sx={{
              fontFamily: "Anta",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: '0.5px',
              mr: 1
            }}>
              Play Now
            </Typography>
            <PlayArrowIcon sx={{ fontSize: '1.3rem' }} />
          </Button>
        </Box>

        {/* Hero Animation Section */}
        <Box sx={{
          display: { xs: 'none', md: 'block' },
          width: '100%',
          maxWidth: '400px',
          filter: 'drop-shadow(0 0 40px rgba(118, 75, 162, 0.4))',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
        }}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
              }
            }}
            height="auto"
            width="100%"
          />
        </Box>
      </Stack>
    </>
  );
};

export default Hero;