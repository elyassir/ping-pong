import { useState, useEffect } from 'react';
import api from '../../Tools/axios';



const list = [
    1, 3, 2, 23, 23, 1, 2
]

list.push.apply(list, list);
list.push.apply(list, list);
list.push.apply(list, list);


export default function useLastMatches(username: string) {
    const [listFriends, setListFriends] = useState([] as any);

    useEffect(() => {
        const fetchLastMatches = async () => {
            try {
                const { data } = await api.get(`/game/UserLast/${username}`);
                setListFriends(data.games);
            }
            catch (error: any) {
                //console.log(error); // Original had console.log(error.message);
            }
        }
        fetchLastMatches();
    }
        , []);

    return { listFriends };
}
