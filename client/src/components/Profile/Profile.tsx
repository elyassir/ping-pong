import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import ChangeInfoForm from './ChangeInfoForm';
import Statistics from "./Statistics"
import LoadingPage from '../LoadingPage/LoadingPage';
import ProfileInfo from './ProfileInfo'
import { Stack } from '@mui/material/'
import History from './History';
import Achievement from './Achievement';
import AccountMenu from '../Home/Profile';
import Logo from '../Home/Logo';
import { UserContext } from '../Context/main';
import useProfileInfo from './Hooks/useProfile';
import { useParams } from "react-router-dom";
import './Profile.css';

export default function Profile(
    {
        friendsState,
        getFriends,
        socket,
        notifications,
        setNotifications
    }: {
        notifications: any,
        friendsState: any,
        getFriends: any,
        socket: any,
        setNotifications: any
    }
) {
    const { change } = useParams();
    let [changeInfo, setChangeInfo] = useState(change === "update_info");
    const [loading, setLoading] = React.useState(false);
    const AuthUser = React.useContext(UserContext);
    const { error, loading2, setSrcImage, data, setData, srcImage } = useProfileInfo();

    React.useEffect(() => {
        getFriends();
    }, []);

    if (error) {
        return (
            <Box className="profile-page" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div id="app">
                    <Logo />
                    <AccountMenu getFriends={getFriends} socket={socket} notifications={notifications} setNotifications={setNotifications} username={AuthUser.username} image={AuthUser.image} />
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>
                        User not found
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (loading2) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box className="profile-page" sx={{ height: '100%' }}>

            {changeInfo && (
                <ChangeInfoForm
                    change={change === "update_info"}
                    setSrcImage={setSrcImage}
                    setLoading={setLoading}
                    data={data}
                    setChangeInfo={setChangeInfo}
                    setData={setData}
                />
            )}

            {/* ── Top nav ── */}
            <div id="app">
                <Logo />
                <AccountMenu
                    getFriends={getFriends}
                    socket={socket}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    username={AuthUser.username}
                    image={AuthUser.image}
                />
            </div>

            {loading ? <LoadingPage /> : (
                <Box sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>

                    {/* ── Row 1: Profile Info + Stats ── */}
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={2.5}
                        alignItems="stretch"
                    >
                        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', lg: '48%' } }}>
                            <ProfileInfo
                                friendsState={friendsState}
                                srcImage={srcImage}
                                data={data}
                                setChangeInfo={setChangeInfo}
                                getFriends={getFriends}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Statistics data={data} />
                        </Box>
                    </Stack>

                    {/* ── Row 2: History + Achievements ── */}
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={2.5}
                        alignItems="stretch"
                    >
                        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', lg: '58%' } }}>
                            <History data={data} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Achievement data={data} />
                        </Box>
                    </Stack>

                </Box>
            )}
        </Box>
    );
}