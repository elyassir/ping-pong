import { Box, Tooltip, Typography } from "@mui/material";
import "./Profile.css";

const MEDALS = [
  { label: 'Bronze', threshold: 1, img: '/static/images/bronze-medal.png', desc: 'Win 1 game' },
  { label: 'Silver', threshold: 5, img: '/static/images/silver-medal.png', desc: 'Win 5 games' },
  { label: 'Gold', threshold: 10, img: '/static/images/gold-medal.png', desc: 'Win 10 games' },
  { label: 'Platinum', threshold: 15, img: '/static/images/platinum-medal.png', desc: 'Win 15 games' },
  { label: 'Master', threshold: 20, img: '/static/images/master-medal.png', desc: 'Win 20 games' },
];

export default function Achievement({ data }: any) {
  const wins = parseInt(data.win) || 0;

  return (
    <Box className="glass-card" sx={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <Typography sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.4)',
      }}>
        Achievements
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '12px',
      }}>
        {MEDALS.map(({ label, threshold, img, desc }) => {
          const unlocked = wins >= threshold;
          return (
            <Tooltip
              key={label}
              title={
                <Box>
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.8rem' }}>{label}</Typography>
                  <Typography sx={{ fontFamily: 'Inter', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{desc}</Typography>
                  {!unlocked && (
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.68rem', color: '#f87171', mt: 0.3 }}>
                      {threshold - wins} win{threshold - wins !== 1 ? 's' : ''} to go
                    </Typography>
                  )}
                </Box>
              }
              arrow
              placement="top"
            >
              <Box className={`badge-item ${unlocked ? 'unlocked' : 'locked'}`}>
                <img src={img} alt={label} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                <Typography sx={{
                  fontFamily: 'Inter',
                  fontSize: '0.7rem',
                  fontWeight: unlocked ? 600 : 400,
                  color: unlocked ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                }}>
                  {label}
                </Typography>
                {unlocked && (
                  <Box sx={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#34d399',
                    boxShadow: '0 0 6px #34d399',
                  }} />
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Progress summary */}
      <Box sx={{ mt: 'auto', pt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            {MEDALS.filter(m => wins >= m.threshold).length}/{MEDALS.length} unlocked
          </Typography>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '0.75rem', color: '#1f90b8' }}>
            {wins} wins
          </Typography>
        </Box>
        <Box className="level-bar-track">
          <Box
            className="level-bar-fill"
            sx={{ width: `${Math.min((wins / 20) * 100, 100)}%` }}
          />
        </Box>
      </Box>
    </Box>
  );
}
