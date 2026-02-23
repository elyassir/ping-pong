import { useContext, useEffect, useState } from "react";
import type { FriendsState } from "../components/Context/user";
import { UserContext } from "../components/Context/main";
import api from "../components/Tools/axios";

const useGetFreindsState = () => {
    const [friendsState, setFriendsState] = useState<FriendsState>({
        AcceptedFriends: [],
        SentRequests: [],
        RecievedRequests: [],
        Blocked: [],
    });
    const AuthUser = useContext(UserContext);
    const [render2, setRender2] = useState(false);

    const getFriends = async () => {
        try {
            if (!localStorage.getItem("access_token")) {
                throw new Error("No access token found");
            }
            const { data } = await api.get("/friends/");
            //console.log(data);
            const AcceptedFriends = data.friends.filter((friend: any) => friend.status === "accepted");
            const SentRequests = data.friends.filter((friend: any) => friend.status === "pending" && friend.sender === AuthUser.username);
            const RecievedRequests = data.friends.filter((friend: any) => friend.status === "pending" && friend.receiver === AuthUser.username);
            const blocked = data.blocked;
            console.log(blocked);
            setFriendsState({
                AcceptedFriends: AcceptedFriends,
                SentRequests: SentRequests,
                RecievedRequests: RecievedRequests,
                Blocked: blocked,
            });
            setRender2(true);

        } catch (error) {
            console.error(error);
            setRender2(true);
        }
    };

    useEffect(() => {
        getFriends();
    }, []);

    return { friendsState, setFriendsState, render2, getFriends };
};

export default useGetFreindsState;