import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, type JSX } from "react";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../Context/main";
import Message from "./Message";
import { type FriendsState, type Message as MessageInterface } from "../Context/user";
import api from "../Tools/axios";

import data from '@emoji-mart/data'

import Picker from '@emoji-mart/react'
import { ArrowBack, Settings } from "@mui/icons-material";
import ChatBarSettings from "./ChatBar/ChatBarSettings";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const checkWhiteSpace = (str: string): boolean => {
  return !str.replace(/\s/g, '').length;
}

interface ChatListProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  socket: any;
  setFriendsState: React.Dispatch<React.SetStateAction<FriendsState[]>>;
  friendsState: FriendsState;
}

export default function ChatBar({ socket, selected, setSelected, friendsState, setFriendsState }: ChatListProps) {
  const AuthUser = useContext(UserContext);
  const [messages, setMessages] = React.useState<MessageInterface[]>(AuthUser.messages);
  const user = friendsState.AcceptedFriends.find((element) => element.user === selected);
  const parentDiv = React.useRef<HTMLDivElement>(null);
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const textFieldRef = React.useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = React.useState("");

  function App() {
    return (
      <Picker data={data} onEmojiSelect={(e: any) => {
        setIsPickerVisible(false)
        //console.log(e.native)
        setMessageText(messageText + e.native)
        //console.log(messageText)
        textFieldRef.current?.focus();
      }} />
    )
  }

  const fetchMessages = async () => {
    if (user === undefined) {
      return;
    }
    const { data } = await api.get(`/messages/room/${user.roomId}`);
    setMessages(data.messages);
    AuthUser.messages = data.messages;
  }

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    socket.emit("joinRoom", { roomId: user.roomId.toString(), type: 'dm' });
    fetchMessages();

    user.unseenNum = 0;

    setFriendsState((prev: any) => {
      const newFriends = prev.AcceptedFriends.map((friend: any) => {
        if (friend.user === selected) {
          friend.unseenNum = 0;
        }
        return friend;
      })
      return {
        ...prev,
        friends: newFriends
      }
    }
    )

    socket.on("joinRoom", (arg: any) => {
      //console.log(`Joined room successfully: ${arg.message.roomId}`)
    })

    socket.on("Messages", (arg: any) => {
      if (arg.error !== undefined) {
        toast.error(arg.error);
        //console.log(arg.error);
        return;
      }

      socket.emit('seenRightAway', {
        sender: AuthUser.username, receiver: selected, roomId: user.roomId, type: "dm"
      })
      if (arg.message.reciepient === AuthUser.username) {
        return;
      }
      console.log(arg.message)
      setMessages([...AuthUser.messages, {
        content: arg.message.content,
        sender_name: arg.message.sender,
        reciepient: arg.message.receiver,
        created_on: new Date().toString()
      }])
      console.log(new Date().toString())
      AuthUser.messages.push({
        content: arg.message.content,
        sender_name: arg.message.sender,
        reciepient: arg.message.receiver,
        created_on: new Date().toString()
      })
      setTimeout(() => {
        if (parentDiv.current) parentDiv.current.scrollTop = parentDiv.current.scrollHeight;
      }, 250);
    })
    setTimeout(() => {
      if (parentDiv.current) parentDiv.current.scrollTop = parentDiv.current.scrollHeight;
    }, 1000);

    return () => {
      socket.off("joinRoom")
      socket.off("Messages")
      // if (user)
      socket.emit("leaveRoom", '1');
      // alert(1)
      user.unseenNum = 0;
      // user.unseenNum = 0;
      setFriendsState((prev: any) => {
        const newFriends = prev.AcceptedFriends.map((friend: any) => {
          if (friend.user === selected) {
            friend.unseenNum = 0;
          }
          return friend;
        })
        return {
          ...prev,
          friends: newFriends
        }
      }
      )
    }
  }, [selected]);

  if (!user) {
    return <>

    </>;
  }

  const handle_change = (e: any) => {
    const { value } = e.target;
    if (value === "" || checkWhiteSpace(value)) {
      return;
    }
    socket.emit("Writting", { sender: AuthUser.username, roomId: user.roomId });
    if (e.key === "Enter") {
      socket.emit("Messages", { content: value, sender: AuthUser.username, receiver: selected, roomId: user.roomId });
      setMessageText("");
      setMessages([...AuthUser.messages, {
        content: value,
        sender_name: AuthUser.username,
        reciepient: selected,
        created_on: new Date().toString()
      }])
      AuthUser.messages.push({
        content: value,
        sender_name: AuthUser.username,
        reciepient: selected,
        created_on: new Date().toString()
      })
      setTimeout(() => {
        if (parentDiv.current) parentDiv.current.scrollTop = parentDiv.current.scrollHeight;
      }, 250);
    }
  }

  return (

    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={"stretch"}
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "auto",
        height: "100%",
        overflow: "hidden",
        gap: "12px",
      }}
    >


      {/* ── Header ── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          background: "rgba(34,46,53,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 14px",
          flexShrink: 0,
        }}
      >
        {/* Back arrow – mobile only */}
        <Box sx={{
          display: 'none',
          '@media (max-width: 800px)': { display: 'flex' },
        }}>
          <IconButton onClick={() => setSelected("")} size="small">
            <ArrowBack sx={{ color: '#FCFCF6', fontSize: '20px' }} />
          </IconButton>
        </Box>

        {/* User info */}
        <Link to={`/profile/${user.user}`} style={{ textDecoration: 'none', flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              src={user.image}
              sx={{ width: 40, height: 40, border: "2px solid rgba(31,144,184,0.5)" }}
            />
            <Box>
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.2 }}>
                {user.user}
              </Typography>
            </Box>
          </Stack>
        </Link>

        <Box>
          <ChatBarSettings user={user} socket={socket} />
        </Box>
      </Stack>
      {/* ── Messages area ── */}
      <Box
        ref={parentDiv}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          padding: "0 4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {
          messages.length === 0 ? (
            <Box sx={{ margin: "auto", textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}>
                No messages yet — say hello! 👋
              </Typography>
            </Box>
          ) : messages.map(
            (element: MessageInterface, key: number): JSX.Element => (
              <Message
                lastDiv={null}
                key={key}
                sender={element.sender_name}
                message={element}
                previousMessage={messages[key - 1]}
              >
                {element.content}
              </Message>
            )
          )
        }
      </Box>
      {/* Input */}

      {/* ── Input bar ── */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          background: "rgba(34,46,53,0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "8px 12px",
          position: "relative",
          flexShrink: 0,
          gap: "6px",
        }}
      >
        {/* Emoji picker */}
        <div style={{
          position: "absolute",
          bottom: "60px",
          right: 0,
          display: isPickerVisible ? "block" : "none",
          zIndex: 10,
        }}>
          <App />
        </div>

        {/* Emoji toggle */}
        <IconButton
          onClick={() => setIsPickerVisible(!isPickerVisible)}
          size="small"
          sx={{ color: "white", opacity: isPickerVisible ? 1 : 0.5, flexShrink: 0 }}
        >
          <Typography sx={{ fontSize: "20px", lineHeight: 1 }}>&#128516;</Typography>
        </IconButton>

        {/* Text field */}
        <TextField
          ref={textFieldRef}
          variant="standard"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          onKeyDown={handle_change}
          fullWidth
          placeholder="Type a message..."
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "white",
              fontSize: "0.95rem",
              padding: "4px 0",
              '& input::placeholder': {
                color: 'rgba(255,255,255,0.35)',
                opacity: 1,
              },
            },
          }}
          sx={{ flex: 1 }}
        />

        {/* Send button */}
        <IconButton
          disabled={messageText === "" || checkWhiteSpace(messageText)}
          onClick={() => {
            socket.emit("Messages", { content: messageText, sender: AuthUser.username, receiver: selected, roomId: user.roomId });
            setMessageText("");
            setMessages([...AuthUser.messages, {
              content: messageText,
              sender_name: AuthUser.username,
              reciepient: selected,
              created_on: new Date().toString()
            }]);
            AuthUser.messages.push({
              content: messageText,
              sender_name: AuthUser.username,
              reciepient: selected,
              created_on: new Date().toString()
            });
            setTimeout(() => {
              if (parentDiv.current) parentDiv.current.scrollTop = parentDiv.current.scrollHeight;
            }, 250);
          }}
          size="small"
          sx={{
            flexShrink: 0,
            backgroundColor: messageText === "" || checkWhiteSpace(messageText)
              ? "transparent"
              : "#1f90b8",
            borderRadius: "10px",
            padding: "8px",
            transition: "background-color 0.2s ease",
            '&:disabled': { opacity: 0.3 },
            '&:hover:not(:disabled)': { backgroundColor: "#1a7da0" },
          }}
        >
          <SendIcon sx={{ color: "white", fontSize: "18px" }} />
        </IconButton>
      </Stack>
    </Stack>

  );
}
