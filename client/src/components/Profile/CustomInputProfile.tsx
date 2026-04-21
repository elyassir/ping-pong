import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import api from "../Tools/axios";

function hasWhiteSpace(s: string) {
    return /\s/.test(s);
}


export default function CustomInputProfile(
    { placeholder, value, setValue }: { placeholder: string, value: string, setValue: any }
) {
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState(' ');
    const [loading, setLoading] = React.useState(false);

    var timer: ReturnType<typeof setTimeout>;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const checkNameIsReserved = async (name: string) => {
        try {
            const { data } = await api.get(`/users/check/${name}`);
            setError(false);
            setHelperText(' ');
            setLoading(false);
        }
        catch (error: any) {
            setError(true);
            setHelperText(error.response?.data?.error || 'Username is taken');
            setLoading(false);
        }
    }


    return (
        <>
            <TextField
                fullWidth
                error={
                    loading ? false : error
                }
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={
                    (e) => {
                        clearTimeout(timer);
                    }
                }
                onKeyUp={
                    (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (value.length === 0) {
                            setError(true);
                            setHelperText('Empty field!');
                        } else if (hasWhiteSpace(value)) {
                            setError(true);
                            setHelperText('Name must not contain white spaces!');
                        } else {
                            clearTimeout(timer);

                            timer = setTimeout(() => {
                                setLoading(true);
                                setTimeout(() => {
                                    checkNameIsReserved(value);

                                }, 1000);
                            }, 1000);

                        }
                    }
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {
                                loading ? <CircularProgress size={24} /> :
                                    error ? <ErrorIcon color="error" /> : <CheckCircleOutlineIcon color="success" />
                            }
                        </InputAdornment>
                    ),
                }}
                value={value}
                helperText={helperText}
                type="text"
                disabled={loading}
            />
        </>
    );
}