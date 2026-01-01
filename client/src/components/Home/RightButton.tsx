import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LastMatchesTabel from './LastMatchesTabel';
import { ArrowForward } from '@mui/icons-material';

export default function RightButton() {
  const [state, setState] = React.useState(false);

  function toggleDrawer(open: boolean) {
    return function (event: React.KeyboardEvent | React.MouseEvent) {
      if ((event as React.KeyboardEvent).key === 'Shift') {
        return;
      }
      setState(open);
    };
  }

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        endIcon={<ArrowForward />}
        sx={{
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "12px 24px",
          textTransform: "none",
          fontFamily: "Rubik",
          fontSize: "1rem",
          fontWeight: 500,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          '&:hover': {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transform: "translateX(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }
        }}
      >
        Matches
      </Button>

      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(21, 21, 21, 0.95)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white"
          }
        }}
      >
        <Box
          onKeyDown={toggleDrawer(false)}
          sx={{ width: { xs: '100vw', sm: '400px' } }}
        >
          <LastMatchesTabel />
        </Box>
      </Drawer>
    </>
  );
}