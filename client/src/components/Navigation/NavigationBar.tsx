import { Paper, Stack, IconButton, Tooltip, Zoom } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { useContext } from "react";
import { UserContext } from "../Context/main";

const NavigationBar = () => {
  const AuthUser = useContext(UserContext);
  const location = useLocation();

  const navItems = [
    { icon: <HomeRoundedIcon />, label: "Home", path: "/" },
    { icon: <PersonRoundedIcon />, label: "Profile", path: `/profile/${AuthUser.username}` },
    { icon: <ChatBubbleRoundedIcon />, label: "Chat", path: "/chat" },
    { icon: <SportsEsportsRoundedIcon />, label: "Play", path: "/PlayGame" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: "rgba(22, 22, 22, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        padding: "8px 16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Stack direction="row" spacing={1}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Tooltip
              key={item.label}
              title={item.label}
              TransitionComponent={Zoom}
              arrow
              placement="top"
            >
              <IconButton
                component={Link}
                to={item.path}
                sx={{
                  color: isActive ? "#fff" : "rgba(255, 255, 255, 0.4)",
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  padding: "12px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transform: "translateY(-4px)"
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.75rem"
                  }
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default NavigationBar;

