import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useLastMatches from './Hooks/useLastMatches';
import "./Profile.css";

export default function LastMatchesListHistory(props: any) {
    const { data } = props;
    const { listFriends } = useLastMatches(data.username);

    if (listFriends.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, py: 5 }}>
                <Typography sx={{ fontSize: '2rem' }}>🏓</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', fontSize: '0.88rem' }}>
                    No matches played yet
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
            maxHeight: '340px',
            paddingRight: '4px',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
        }}>
            {listFriends.map((match: any, key: number) => {
                const didWin = match.playerOScore > match.playerTScore;

                return (
                    <Box key={key} className="match-row">
                        {/* Player One */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                            <Link to={`/profile/${match.playerO.username}`} style={{ flexShrink: 0 }}>
                                <Avatar
                                    alt={match.playerO.username}
                                    src={match.playerO.image}
                                    sx={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.1)' }}
                                />
                            </Link>
                            <Typography sx={{
                                fontFamily: 'Inter',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.85)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {match.playerO.username}
                            </Typography>
                        </Box>

                        {/* Score */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: '16px', flexShrink: 0 }}>
                            <Typography sx={{ fontFamily: 'Rubik', fontWeight: 700, fontSize: '1.1rem', color: match.playerOScore >= match.playerTScore ? '#34d399' : '#f87171' }}>
                                {match.playerOScore}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', fontWeight: 600, letterSpacing: '0.05em' }}>
                                VS
                            </Typography>
                            <Typography sx={{ fontFamily: 'Rubik', fontWeight: 700, fontSize: '1.1rem', color: match.playerTScore >= match.playerOScore ? '#34d399' : '#f87171' }}>
                                {match.playerTScore}
                            </Typography>
                        </Box>

                        {/* Player Two */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0, justifyContent: 'flex-end' }}>
                            <Typography sx={{
                                fontFamily: 'Inter',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: 'rgba(255,255,255,0.85)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textAlign: 'right',
                            }}>
                                {match.playerT.username}
                            </Typography>
                            <Link to={`/profile/${match.playerT.username}`} style={{ flexShrink: 0 }}>
                                <Avatar
                                    alt={match.playerT.username}
                                    src={match.playerT.image}
                                    sx={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.1)' }}
                                />
                            </Link>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}