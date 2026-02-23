import { useContext } from "react";
import { UserContext } from "../../Context/main";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import React from "react";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import api from "../../Tools/axios";




export const InviteFriendToGameButton = ({ friend, socket, children }: { friend: any, socket: any, children: any }) => {
    const AuthUser = useContext(UserContext)

    const fun = async () => {
        try {
            const { data } = await api.post('/game/create', { recipient: friend.user });
            socket.emit('GameInvite', { recipient: friend.user, sender: AuthUser.username, gameId: data.gameId });
            toast.info(`Game invite sent to ${friend.user}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error sending game invite');
        }
    }

    return (
        <>
            <Button onClick={fun}>
                {
                    children
                }
            </Button>
        </>
    )
}