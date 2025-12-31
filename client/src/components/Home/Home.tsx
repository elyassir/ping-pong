import React, { useContext } from "react";
import Logo from "./Logo";
import AccountMenu from "./Profile";
import LeftButton from "./LeftButton/LeftButton";
import SignIn from "./SignIn";
import RightButton from "./RightButton";
import { SearchBar } from "./SearchBar";
import { UserContext } from "../Context/main";
import Hero from "./Hero/Hero";
import { Box } from "@mui/material";
import NavigationBar from "../Navigation/NavigationBar";
import "./Home.css"


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
    <>
      <Box>
        <div
          style={
            {
              height: "100vh",
            }
          }
        >
          <div id="animated-circle">
            <div id="animated-circle-child">
            </div>
          </div>
          <div id="app">
            <Logo />
            <SearchBar />
            <AccountMenu getFriends={getFriends} socket={socket} notifications={notifications} setNotifications={setNotifications} username={AuthUser.username} image={AuthUser.image} />
          </div>

          <div id="center">
            <LeftButton setFriendsState={setFriendsState} friendsState={friendsState} getFriends={getFriends} />
            <Hero friendsState={friendsState} socket={socket} />
            <RightButton />
          </div>
        </div>

      </Box>
      <NavigationBar></NavigationBar>

    </>
  );
}
