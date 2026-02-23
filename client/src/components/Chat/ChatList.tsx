import React, { useContext } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  Avatar,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Normal from "./Normal";
import { UserContext } from '../Context/main'
import ChatSettings from "./ChatSettings";
import ChannelsList from "./Channels/ChannelsList";
import { type ChannelInterface, type FriendsState } from "../Context/user";
import { toast } from "react-toastify";
import api from "../Tools/axios";

interface ChatListProps {

  selected: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  selectedChannel: string,
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>,

  setConversations: React.Dispatch<React.SetStateAction<ChannelInterface[]>>
  conversations: ChannelInterface[],
  isTyping: boolean
  friendsState: FriendsState
}

export default function ChatList(
  { selected, setSelected, selectedChannel, friendsState, setSelectedChannel, conversations, setConversations, isTyping }: ChatListProps
) {
  const AuthUser = useContext(UserContext);
  const [showChannels, setShowChannels] = React.useState(false);
  const fetchGroups = async () => {
    try {
      await api.get('/groups');
      setConversations(conversations);
    }
    catch (e) {
      //console.log(e);
      toast.error("An error occured while fetching groups");
    }
  }


  return (

    <Stack
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 16px",
          flexShrink: 0,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
          <Avatar
            src={AuthUser.image}
            sx={{ width: 38, height: 38, border: "2px solid rgba(31,144,184,0.45)" }}
          />
          <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#fff" }}>
            {AuthUser.username}
          </Typography>
        </Stack>
        <ChatSettings conversations={conversations} setConversations={setConversations} />
      </Stack>
      <Stack
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Channels button */}
        <Stack sx={{ flexShrink: 0 }}>
          <Button
            startIcon={
              <GroupsIcon
                sx={{
                  color: "#1F90B8",
                  width: "20px",
                  height: "20px",
                }}
              />
            }
            sx={{
              color: "rgba(255,255,255,0.75)",
              justifyContent: "flex-start",
              textTransform: "none",
              padding: "12px 16px",
              width: "100%",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 0,
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              '&:hover': {
                backgroundColor: "rgba(31,144,184,0.1)",
                color: "#fff",
              },
            }}
            onClick={() => {
              setShowChannels(true);
              setSelected('');
              fetchGroups();
            }}
          >
            Channels
          </Button>
        </Stack>

        {/* Friend list */}
        <Stack
          direction={"column"}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {
            friendsState.AcceptedFriends.map((friend, index) => (
              <Normal
                isSelected={selected === friend.user}
                online={friend.onlineStatus}
                selected={selected}
                key={index}
                name={friend.user}
                image={friend.image}
                roomId={friend.roomId}
                setSelected={setSelected}
                unseenNum={friend.unseenNum}
                isTyping={isTyping}
              />
            ))
          }
        </Stack>
        <ChannelsList
          selected={selectedChannel}
          setSelected={setSelectedChannel}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          showChannels={showChannels}
          setShowChannels={setShowChannels}
          groups={conversations}
          setGroups={setConversations}
          conversation={conversations}
        />
      </Stack>
    </Stack>
  );
}


/*

*/