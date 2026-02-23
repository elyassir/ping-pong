import { IconButton, Menu, MenuItem } from "@mui/material"
import type { ChannelInterface, FriendsState } from "../../../Context/user"
import { MoreVert } from "@mui/icons-material"
import type { MembersInterface } from "./ChannelMembers"
import React, { useEffect } from "react"
import { toast } from "react-toastify"
import api from "../../../Tools/axios"



export default function MoreOptionsMember(
    {
        chat,
        member,
        setMembers,
        members,
        mutedMembers,
        setMutedMembers,
        setFriendsState,
        friendsState
    }: {
        chat: ChannelInterface,
        member: MembersInterface,
        setMembers: React.Dispatch<React.SetStateAction<MembersInterface[]>>,
        members: MembersInterface[],
        mutedMembers: { username: string, image: string }[],
        setMutedMembers: React.Dispatch<React.SetStateAction<{ username: string, image: string }[]>>,
        setFriendsState: React.Dispatch<React.SetStateAction<FriendsState>>,
        friendsState: FriendsState
    }
) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)

    const handleSetAdmin = async () => {
        try {
            await api.post(`/groups/${chat.id}/promote/${member.username}`);
            toast.success('success');
            setMembers((prev) => prev.map((mem) =>
                mem.username === member.username ? { ...mem, role: 'Admin' } : mem
            ));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleUnsetAdmin = async () => {
        try {
            await api.post(`/groups/${chat.id}/demote/${member.username}`);
            toast.success('success');
            setMembers((prev) => prev.map((mem) =>
                mem.username === member.username ? { ...mem, role: 'Member' } : mem
            ));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleBlockUser = async () => {
        try {
            await api.post(`/friends/block/${member.username}`);
            toast.success('you have successfully blocked that user')
            setFriendsState((prev) => ({
                ...prev,
                Blocked: [...prev.Blocked, member.username]
            }));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleUnBlockUser = async () => {
        try {
            await api.post(`/friends/unblock/${member.username}`);
            toast.success('you have successfully unblocked that user')
            setFriendsState((prev) => ({
                ...prev,
                Blocked: prev.Blocked.filter((e) => e !== member.username)
            }));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleMuteMember = async () => {
        try {
            await api.post(`/groups/${chat.id}/mute/${member.username}`);
            toast.success('success');
            setMutedMembers((prev) => [...prev, { username: member.username, image: member.image }]);
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleKickMember = async () => {
        try {
            await api.delete(`/groups/delete/${chat.id}/${member.username}`);
            toast.success('success');
            setMembers((prev) => prev.filter((mem) => mem.username !== member.username));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleUnMuteMember = async () => {
        try {
            await api.post(`/groups/${chat.id}/unmute/${member.username}`);
            toast.success('success');
            setMutedMembers((prev) => prev.filter((mem) => mem.username !== member.username));
        }
        catch (e) {
            toast.error('error');
        }
    }

    const handleBanMember = async () => {
        try {
            const { data } = await api.post(`/groups/${chat.id}/ban/${member.username}`);
            toast.success(data.success);
            setMembers((prev) => prev.filter((mem) => mem.username !== member.username));
        }
        catch (e) {
            toast.error('error');
        }
    }


    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    }

    useEffect(() => {
        //console.log(anchorEl);
        //console.log(open);
    }, [open, anchorEl]
    );

    return (
        <>
            <IconButton onClick={handleClick} sx={{ padding: '0' }}>
                <MoreVert sx={{ color: 'white' }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={
                    {

                    }
                }
            >
                {
                    chat.isOwner && member.role !== 'Owner' ?
                        member.role === 'Admin' ?
                            <MenuItem onClick={handleUnsetAdmin}>Demote Admin</MenuItem>
                            :
                            <MenuItem onClick={handleSetAdmin}>Promote Admin</MenuItem>
                        :
                        <></>
                }
                {
                    member.role !== 'Owner' && chat.isAdmin ?
                        mutedMembers.find((mem) => mem.username === member.username) === undefined ?
                            chat.isOwner ?
                                <MenuItem onClick={handleMuteMember}>Mute Member</MenuItem>
                                :
                                member.role !== 'Admin' ?
                                    <MenuItem onClick={handleMuteMember}>Mute Member</MenuItem>
                                    :
                                    null
                            :
                            <>
                                {
                                    chat.isOwner ?
                                        <MenuItem onClick={handleUnMuteMember}>Unmute Member</MenuItem>
                                        :
                                        member.role !== 'Admin' ?
                                            <MenuItem onClick={handleUnMuteMember}>Unmute Member</MenuItem>
                                            :
                                            <>{member.role}</>
                                }
                            </>
                        :
                        null
                }
                {
                    member.role !== 'Owner' && chat.isAdmin ?
                        chat.isOwner ?
                            <MenuItem onClick={handleBanMember}>Ban Member</MenuItem>
                            :
                            member.role !== 'Admin' ?
                                <MenuItem onClick={handleBanMember}>Ban Member</MenuItem>
                                :
                                null
                        :
                        null
                }
                {
                    member.role !== 'Owner' && chat.isAdmin ?
                        chat.isOwner ?
                            <MenuItem onClick={handleKickMember}>Kick Member</MenuItem>
                            :
                            member.role !== 'Admin' ?
                                <MenuItem onClick={handleKickMember}>Kick Member</MenuItem>
                                :
                                null

                        :
                        null
                }
                {
                    friendsState.Blocked.find((blocked) => blocked === member.username) === undefined ?
                        <MenuItem onClick={handleBlockUser} sx={
                            {
                                color: 'red',
                            }
                        }>Block Member</MenuItem>
                        :
                        <MenuItem onClick={handleUnBlockUser} sx={
                            {
                                color: 'red',
                            }
                        }>Unblock Member</MenuItem>
                }
            </Menu>
        </>
    )

}