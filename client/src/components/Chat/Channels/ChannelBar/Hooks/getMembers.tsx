import { useEffect, useState } from "react";
import type { MembersInterface } from "../ChannelMembers";
import type { ChannelInterface } from "../../../../Context/user";
import api from "../../../../Tools/axios";



export default function useGetMembers({ chat }: { chat: ChannelInterface }) {
  const [members, setMembers] = useState<MembersInterface[]>([]);
  const [bannedMembers, setBannedMembers] = useState<{ username: string, image: string }[]>([]);
  const [muteMembers, setMuteMembers] = useState<{ username: string, image: string }[]>([]);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get(`/groups/members/${chat.id}`);
      setBannedMembers(data.banned);
      setMuteMembers(data.muted);
      const mem: MembersInterface[] = data.members.map((member: MembersInterface) => {
        return {
          username: member.username,
          image: member.image,
          role: data.owner.username === member.username ? 'Owner' : data.admins.find((admin: any) => admin.username === member.username) ? 'Admin' : 'Member'
        }
      });
      mem.sort((a, b) => {
        if (a.role === 'Owner') return -1;
        if (a.role === 'Admin' && b.role === 'Member') return -1;
        if (a.role === 'Member' && b.role === 'Admin') return 1;
        return 0;
      });
      setMembers(mem);
    } catch (error) {
      //console.log('error:', error);
    }
  }

  useEffect(() => {
    fetchMembers();
  }
    , []);

  return { fetchMembers, members, bannedMembers, muteMembers, setBannedMembers, setMuteMembers, setMembers };

}