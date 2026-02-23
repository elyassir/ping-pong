import { useState, useEffect } from 'react';
import api from '../../Tools/axios';
import { useParams } from "react-router-dom";



export default function useProfileInfo() {
    let [loading2, setLoading2] = useState(true);
    let [error, setError] = useState(false);
    const [data, setData] = useState<any>({});
    let { username } = useParams();
    const [srcImage, setSrcImage] = useState(data.image as string);

    const fetchProfile: () => void = async () => {
        try {
            const response = await api.get(`/users/getInfo/${username}`);
            const data = response.data; // Axios returns data directly in .data property
            if (data.error !== undefined) {
                console.log(data.error);
                setError(true);
                return;
            }
            setData(data);
            console.log(data);
            setLoading2(false);
            setSrcImage(data.image);
        }
        catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return { loading2, error, data, setSrcImage, srcImage, setData };
}