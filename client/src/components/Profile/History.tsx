import { Box, Typography } from "@mui/material";
import LastMatchesListHistory from "./LastMatchesListHistory";
import "./Profile.css";

export default function History({ data }: any) {
  return (
    <Box className="glass-card" sx={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.4)',
      }}>
        Match History
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <LastMatchesListHistory data={data} />
      </Box>
    </Box>
  );
}
