import React, { useContext, useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBar from "./ChatBar";
import { Box, Stack, Typography } from "@mui/material";
import "./Chat.css";
import { Link, useParams } from "react-router-dom";
import ChannelBar from "./Channels/ChannelBar";
import { type ChannelInterface, type FriendsState } from "../Context/user";
import { UserContext } from "../Context/main";
import Lottie from 'react-lottie';
import animationData from './Animation.json';


export default function Chat(
  {
    socket,
    conversations,
    setConversations,
    getConversations,
    friendsState,
    setFriendsState,
    getFriends
  }: {
    getConversations: any,
    friendsState: FriendsState,
    setFriendsState: any,
    socket: any,
    conversations: ChannelInterface[],
    setConversations: React.Dispatch<React.SetStateAction<ChannelInterface[]>>,
    getFriends: any
  }
) {
  const chatWith = useParams().name;
  const [selected, setSelected] = React.useState(chatWith ? chatWith : "");
  const [selecteChannel, setSelectedChannel] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const AuthUser = useContext(UserContext);
  let timer: ReturnType<typeof setTimeout>

  if (chatWith) {
    window.history.replaceState({}, "", "/chat");
  }

  useEffect(() => {
    socket.on("Writting", (arg: any) => {
      if (arg.sender === AuthUser.username) {
        return;
      }
      setIsTyping(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    })
    getConversations();
    getFriends()
  }, []);

  return (
    <Box
      id="chat-container"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "12px",
        gap: "10px",
        boxSizing: "border-box",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ── */}
      <Box
        sx={{
          width: "320px",
          flexShrink: 0,
          backgroundColor: "#111B21",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
          overflow: "hidden",
          borderRadius: "18px",
          '@media (max-width: 800px)': {
            display: selecteChannel === "" && selected === "" ? "flex" : "none",
            width: "100%",
            flexDirection: "column",
          },
        }}
      >
        <ChatList
          friendsState={friendsState}
          isTyping={isTyping}
          selectedChannel={selecteChannel}
          setSelectedChannel={setSelectedChannel}
          selected={selected}
          setSelected={setSelected}
          setConversations={setConversations}
          conversations={conversations}
        />
      </Box>

      {/* ── Main panel ── */}
      <Stack
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          overflow: "hidden",
          borderRadius: "18px",
          padding: "12px 0",
          '@media (max-width: 800px)': {
            display: selecteChannel === "" && selected === "" ? "none" : "flex",
          },
        }}
      >
        {selecteChannel !== "" && (
          <ChannelBar
            setFriendsState={setFriendsState}
            socket={socket}
            selecteChannel={selecteChannel}
            setSelectedChannel={setSelectedChannel}
            setGroups={setConversations}
            groups={conversations}
            friendsState={friendsState}
          />
        )}
        {selected !== "" && (
          <ChatBar
            setFriendsState={setFriendsState}
            socket={socket}
            selected={selected}
            setSelected={setSelected}
            friendsState={friendsState}
          />
        )}
        {selected === "" && selecteChannel === "" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              gap: 2,
              '@media (max-width: 800px)': {
                display: "none",
              },
            }}
          >
            <Box style={{ color: "white" }}>
              <Lottie
                options={{ animationData }}
                height={260}
                width={260}
              />
            </Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
              }}
            >
              Select a conversation to start chatting
            </Typography>
          </Box>
        )}
      </Stack>

      {/* ── Back-to-home button ── */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Box
          className="back-to-home"
          sx={{
            display: selected === "" && selecteChannel === "" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: "rgba(17,27,33,0.9)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4)",
            cursor: "pointer",
            transition: "background-color 0.2s ease, transform 0.15s ease",
            '&:hover': {
              backgroundColor: "#1A2B66",
              transform: "scale(1.06)",
            },
          }}
        >
          <i className="fa fa-house" style={{ fontSize: "16px" }}></i>
        </Box>
      </Link>
    </Box>
  );
}
