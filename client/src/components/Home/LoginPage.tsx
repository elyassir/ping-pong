import { useContext } from "react";
import Logo from "./Logo";
import SignIn from "./SignIn";
import { UserContext } from "../Context/main";
import NavigationBar from "../Navigation/NavigationBar";
import "./Home.css"

import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Lottie from 'react-lottie';
import animationData from './Animation.json';
// import Typewriter from 'typewriter-effect';
import { Typewriter } from 'react-simple-typewriter'




const Hero = ({ }: {}) => {
  return (

    <>
      <Stack className="hero" sx={
        {
          width: "100%",
          position: "relative",
          gridTemplateColumns: "repeat(2,1fr)",
          alignItems: "center",
          gap: "4rem",
          padding: "0 19%",
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          marginBottom: "100px",
          textAlign: "center",
          marginTop: "100px",
          "@media (min-width: 1200px)": {
            flexDirection: "row",
            padding: "0 5%",
            justifyContent: "space-between",
            'WebkitFlexWrap': 'nowrap',
            textAlign: "left",
            width: "80%",
            height: "257px",
          }
        }

      }>
        {
          /* hero-text */
        }
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "100%",
        }}>
          <Box height={300}>
            <Typography sx={
              {
                fontFamily: "Anta",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#fcfcf6",
                "@media (min-width: 1200px)": {
                  fontSize: "3.5rem",
                }
              }
            }>
              Embark on a journey where every
              <span className='text-change-color'>

                <Typewriter
                  words={['click', 'move', 'decision']}
                  loop={3}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={4000}
                />
              </span>
              shapes your <br></br> destiny.
            </Typography>
          </Box>


        </Box>
        {
          /* hero-img */
        }
        <Box sx={
          {
            height: "auto",
            "@media (max-width: 800px)": {
              display: "none",
            }
          }
        }>
          {/* <img style={{
            }} src="/static/controller.png" alt="controller" /> */}
          <Lottie
            options={
              {
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice"
                }
              }
            }
            height={300}
            width={300}
          />
        </Box>
      </Stack >
    </>

  )
}



export default function LoginPage(

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
          <div id="left-chihaja">
            <div id="left-chihaja-child">
            </div>
          </div>
          <div id="app">
            <Logo />

            <SignIn />
          </div>

          <div id="center">
            <Hero />
          </div>
        </div>

      </Box>

      {
        AuthUser.isLoggedIn && <NavigationBar></NavigationBar>
      }
    </>
  );
}
