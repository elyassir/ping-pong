import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Cancel, Edit } from '@mui/icons-material';
import { Avatar, LinearProgress, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UserContext } from '../Context/main';
import type { Friend } from '../Context/user';
import AlertDialog from '../Home/LeftButton/Dialog';
import api from '../Tools/axios';
import "./Profile.css";

interface SectionOneProps {
    data: any;
    setChangeInfo: (changeInfo: boolean) => void;
    srcImage: any;
    friendsState: any;
    getFriends: () => void;
}

interface whichOneInterface {
    whichOne: "add" | "cancel" | "remove" | "accept" | "edit" | "none";
}

const actionButtonSx = {
    borderRadius: '10px',
    textTransform: 'none',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '0.85rem',
    padding: '6px 16px',
    gap: '6px',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    '&:hover': {
        border: '1px solid rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
};

const ProfileInfo = ({ srcImage, data, setChangeInfo, friendsState, getFriends }: SectionOneProps) => {
    const AuthUser = useContext(UserContext);
    const [whichOne, setWhichOne] = useState<whichOneInterface>({ whichOne: "none" });

    const handleAddFriend = async () => {
        try { await api.get("/friends/add/" + data.username); getFriends(); setWhichOne({ whichOne: "cancel" }); }
        catch { }
    };
    const AcceptFriend = async () => {
        try { await api.post("/friends/accept/" + data.username); getFriends(); setWhichOne({ whichOne: "remove" }); }
        catch { }
    };
    const RemoveFriend = async () => {
        try { await api.delete("/friends/remove/" + data.username); getFriends(); setWhichOne({ whichOne: "add" }); }
        catch { }
    };
    const CancelFriend = async () => {
        try { await api.delete("/friends/reject/" + data.username); getFriends(); setWhichOne({ whichOne: "add" }); }
        catch { }
    };

    const handlePendingOrFriend = () => {
        if (AuthUser.username === data.username) { setWhichOne({ whichOne: "edit" }); return; }
        setWhichOne({ whichOne: "add" });
        friendsState.SentRequests.find((f: Friend) => { if (f.user === data.username) { setWhichOne({ whichOne: "cancel" }); return true; } return false; });
        friendsState.RecievedRequests.find((f: Friend) => { if (f.user === data.username) { setWhichOne({ whichOne: "accept" }); return true; } return false; });
        friendsState.AcceptedFriends.find((f: Friend) => { if (f.user === data.username) { setWhichOne({ whichOne: "remove" }); return true; } return false; });
    };

    React.useEffect(() => { handlePendingOrFriend(); }, [friendsState]);

    const levelInt = Math.floor(data.level);
    const levelProgress = Math.round((data.level - levelInt) * 100);

    const actionButton = () => {
        switch (whichOne.whichOne) {
            case "edit": return (
                <Tooltip title="Edit Profile">
                    <Button sx={actionButtonSx} onClick={() => setChangeInfo(true)} startIcon={<Edit sx={{ fontSize: '18px' }} />}>
                        Edit Profile
                    </Button>
                </Tooltip>
            );
            case "add": return (
                <Tooltip title="Send Friend Request">
                    <Button sx={actionButtonSx} onClick={handleAddFriend} startIcon={<PersonAddIcon sx={{ fontSize: '18px' }} />}>
                        Add Friend
                    </Button>
                </Tooltip>
            );
            case "cancel": return (
                <Tooltip title="Cancel Friend Request">
                    <Button sx={{ ...actionButtonSx, borderColor: 'rgba(239,68,68,0.3)', color: 'rgba(239,68,68,0.85)', '&:hover': { borderColor: 'rgba(239,68,68,0.6)', backgroundColor: 'rgba(239,68,68,0.07)' } }} onClick={CancelFriend} startIcon={<Cancel sx={{ fontSize: '18px' }} />}>
                        Cancel Request
                    </Button>
                </Tooltip>
            );
            case "remove": return (
                <AlertDialog action='remove' onClick={RemoveFriend} name={data.username} />
            );
            case "accept": return (
                <Tooltip title="Accept Friend Request">
                    <Button sx={{ ...actionButtonSx, borderColor: 'rgba(52,211,153,0.3)', color: 'rgba(52,211,153,0.9)', '&:hover': { borderColor: 'rgba(52,211,153,0.6)', backgroundColor: 'rgba(52,211,153,0.07)' } }} onClick={AcceptFriend} startIcon={<CheckCircleIcon sx={{ fontSize: '18px' }} />}>
                        Accept
                    </Button>
                </Tooltip>
            );
        }
    };

    return (
        <Box className="glass-card" sx={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* ── Avatar + name row ── */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Box className="avatar-ring">
                    <Avatar
                        src={srcImage}
                        alt={data.username}
                        sx={{ width: 96, height: 96 }}
                    />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        color: '#fff',
                        lineHeight: 1.2,
                        mb: 0.5,
                    }}>
                        {data.real_name || data.username}
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        color: '#1f90b8',
                        mb: 1,
                    }}>
                        @{data.username}
                    </Typography>
                    {/* Action button */}
                    <Box>{actionButton()}</Box>
                </Box>
            </Box>

            {/* ── Bio ── */}
            {data.bio && (
                <Typography sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.6,
                    borderLeft: '2px solid rgba(31,144,184,0.4)',
                    paddingLeft: '12px',
                }}>
                    {data.bio}
                </Typography>
            )}

            {/* ── Level ── */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Level
                    </Typography>
                    <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#1f90b8' }}>
                        {(Math.round(data.level * 100) / 100).toFixed(2)}
                    </Typography>
                </Box>
                <Box className="level-bar-track">
                    <Box
                        className="level-bar-fill"
                        sx={{ width: `${levelProgress}%` }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter' }}>
                        Lvl {levelInt}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter' }}>
                        Lvl {levelInt + 1}
                    </Typography>
                </Box>
            </Box>

            {/* ── Stats pills row ── */}
            <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                    { label: 'Wins', value: data.win, color: '#34d399' },
                    { label: 'Losses', value: data.lose, color: '#f87171' },
                    { label: 'W-Rate', value: `${data.win + data.lose > 0 ? Math.round((data.win / (data.win + data.lose)) * 100) : 0}%`, color: '#1f90b8' },
                ].map(({ label, value, color }) => (
                    <Box key={label} className="stat-pill">
                        <Typography sx={{ fontFamily: 'Rubik', fontWeight: 700, fontSize: '1.3rem', color }}>
                            {value}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Inter', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', mt: 0.3 }}>
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>

        </Box>
    );
};

export default ProfileInfo;