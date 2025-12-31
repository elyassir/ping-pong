import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to={'/'} style={{ textDecoration: 'none' }}>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        padding: '12px 24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        },
        '&:active': {
          transform: 'translateY(0px)',
        }
      }}>

        {/* Logo Text */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
        }}>
          <Box sx={{
            fontSize: '28px',
            fontFamily: 'Anta, sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}>
            PaddlePro
          </Box>
          <Box sx={{
            fontSize: '10px',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            {/* Game On */}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}