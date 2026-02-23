import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationBar from './NotificationBar';
import SettingsComponent from './Settings';

const menuPaperSx = {
  overflow: 'visible',
  background: 'rgba(18,22,28,0.92)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '14px',
  mt: 1.5,
  minWidth: 180,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  '& .MuiMenuItem-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: '8px',
    mx: '6px',
    px: '10px',
    py: '8px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.06)',
      color: '#fff',
    },
  },
  '& .MuiDivider-root': {
    borderColor: 'rgba(255,255,255,0.07)',
    mx: '12px',
  },
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '8px',
};

export default function AccountMenu({ username, image, notifications, setNotifications, socket, getFriends }: {
  image: string, username: string,
  notifications: any[], setNotifications: React.Dispatch<React.SetStateAction<any[]>>,
  socket: any,
  getFriends: any
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [displaySettings, setDisplaySettings] = React.useState(false);

  return (
    <React.Fragment>
      {displaySettings && (
        <SettingsComponent setDisplaySettings={setDisplaySettings} />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <NotificationBar
          notifications={notifications}
          setNotifications={setNotifications}
          socket={socket}
          getFriends={getFriends}
        />
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} sx={{ p: 0.5 }}>
            <Box sx={{
              borderRadius: '50%',
              padding: '2px',
              background: open
                ? 'linear-gradient(135deg, #1f90b8, #0f4c6e)'
                : 'linear-gradient(135deg, rgba(31,144,184,0.4), rgba(15,76,110,0.4))',
              transition: 'background 0.2s ease',
              boxShadow: open ? '0 0 14px rgba(31,144,184,0.4)' : 'none',
            }}>
              <Avatar
                src={image}
                sx={{ width: 44, height: 44 }}
                alt={username}
              />
            </Box>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ sx: menuPaperSx }}
      >
        {/* Username label */}
        <Box sx={{ px: 2, py: 1.2, mb: 0.5 }}>
          <Box sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>
            {username}
          </Box>
        </Box>

        <Divider />

        <MenuItem>
          <Link to={`/profile/${username}`} style={linkStyle}>
            <ListItemIcon sx={{ minWidth: 'unset !important', color: 'rgba(255,255,255,0.5)' }}>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </Link>
        </MenuItem>

        <MenuItem onClick={() => setDisplaySettings(true)}>
          <ListItemIcon sx={{ minWidth: 'unset !important', color: 'rgba(255,255,255,0.5)' }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem sx={{ color: 'rgba(248,113,113,0.85) !important', '&:hover': { color: '#f87171 !important', backgroundColor: 'rgba(248,113,113,0.07) !important' } }}>
          <Link to={`${import.meta.env.VITE_API_URL}/auth/logout`} style={{ ...linkStyle, color: 'inherit' }}>
            <ListItemIcon sx={{ minWidth: 'unset !important', color: 'inherit' }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
