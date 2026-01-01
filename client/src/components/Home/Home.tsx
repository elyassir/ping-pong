import React, { useContext } from "react";
import Logo from "./Logo";
import AccountMenu from "./Profile";
import LeftButton from "./LeftButton/LeftButton";
import RightButton from "./RightButton";
import { SearchBar } from "./SearchBar";
import { UserContext } from "../Context/main";
import Hero from "./Hero/Hero";
import { Box, Stack, Container } from "@mui/material";
import NavigationBar from "../Navigation/NavigationBar";
import "./Home.css";
import "./Login.css"; // Reuse the animations

export default function Home(
  {
    friendsState,
    socket,
    notifications,
    setNotifications,
    getFriends,
    setFriendsState
  }: {
    notifications: any[],
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>,
    socket: any,
    friendsState: any,
    getFriends: any,
    setFriendsState: any
  }
) {
  const AuthUser = useContext(UserContext);

  return (
    <Box className="login-page-scope" sx={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #151515 0%, #1a1a1a 100%)',
    }}>
      {/* Reuse Background Animation */}
      <div className="circle-home">
        <div className="circle-home-child"></div>
      </div>

      {/* Main Content Container with high z-index */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>

        {/* Header Section */}
        <Box component="header" sx={{
          p: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Box sx={{ flexShrink: 0 }}>
            <Logo />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '600px' }}>
            <SearchBar />
          </Box>

          <Box sx={{ flexShrink: 0 }}>
            <AccountMenu
              getFriends={getFriends}
              socket={socket}
              notifications={notifications}
              setNotifications={setNotifications}
              username={AuthUser.username}
              image={AuthUser.image}
            />
          </Box>
        </Box>

        {/* Main Area */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          py: 4
        }}>
          {/* Floating/Side Buttons */}
          <Box sx={{
            position: 'absolute',
            left: { xs: '10px', md: '40px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}>
            <LeftButton
              setFriendsState={setFriendsState}
              friendsState={friendsState}
              getFriends={getFriends}
            />
          </Box>

          <Box sx={{
            position: 'absolute',
            right: { xs: '10px', md: '40px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}>
            <RightButton />
          </Box>

          {/* Center Hero */}
          <Container maxWidth="lg">
            <Hero friendsState={friendsState} socket={socket} />
          </Container>
        </Box>
      </Box>

      {/* Navigation Footer/Bar if needed */}
      <NavigationBar />
    </Box>
  );
}
