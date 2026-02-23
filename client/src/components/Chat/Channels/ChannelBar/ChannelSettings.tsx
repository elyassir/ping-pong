import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from '@mui/material'
import React from 'react'
import AlertDialog from "../../../Home/LeftButton/Dialog";
import type { ChannelInterface } from "../../../Context/user";
import { toast } from "react-toastify";
import UpdateChannelInfo from "./UpdateChannelInfo";
import api from "../../../Tools/axios";

const ChannelSettings = (
  {
    channel,
    setGroups,
    setSelecteChannel

  }: {
    channel: ChannelInterface,
    setGroups: React.Dispatch<React.SetStateAction<ChannelInterface[]>>,
    setSelecteChannel: React.Dispatch<React.SetStateAction<string>>
  }
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLeaveChannel = () => {
    api.delete(`/groups/delete/${channel.id}`)
      .then(() => {
        toast.info(`You have left ${channel.name}`);
        setGroups((prev) => prev.filter((group) => group.id !== channel.id));
        setSelecteChannel('');
      })
      .catch(() => {
        toast.error('Error leaving channel');
      });
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          boxSizing: "border-box",
          color: '#FCFCF6'
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Edit channel</MenuItem> */}
        {
          channel.isOwner ?
            <UpdateChannelInfo channel={channel} onClickFun={handleClose} />
            :
            null
        }
        <AlertDialog action="leave" onClick={handleLeaveChannel} name={channel.name} isOwner={channel.isOwner} />
      </Menu>
    </>
  )
}

export default ChannelSettings
