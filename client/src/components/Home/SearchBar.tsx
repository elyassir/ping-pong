import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState("");
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async (searchTerm: string) => {
        if (!searchTerm) {
            setUsers([]);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            if (!response.ok) return;

            const data = await response.json();
            if (data.length > 0) {
                setUsers(data.map((user: any) => user.username));
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        }
    };

    const handleSearch = () => {
        if (value) {
            navigate('/profile/' + value);
        }
    };

    return (
        <Box
            sx={{
                width: "400px",
                // transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "30px",
                padding: "4px 8px 4px 20px",
            }}
        >
            <Autocomplete
                freeSolo
                options={users}
                value={value}
                sx={{ flex: 1 }}
                onChange={(e: any, newValue: string | null) => {
                    setValue(newValue || "");
                    if (newValue) {
                        navigate('/profile/' + newValue);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search players..."
                        variant="standard"
                        onChange={(e) => {
                            setValue(e.target.value);
                            fetchUsers(e.target.value);
                        }}
                        sx={{
                            input: { color: "white" },
                            color: "white",
                            "& .MuiInput-underline:before": { display: "none" },
                            "& .MuiInput-underline:after": { display: "none" },
                            "& .MuiInputBase-root": { fontSize: '0.95rem', fontFamily: 'Rubik' },
                            "& .MuiInputBase-root:hover": { color: "white" }
                        }}
                    />
                )}
                PaperComponent={({ children }) => (
                    <Box sx={{
                        backgroundColor: "rgba(25, 25, 25, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                        marginTop: 1,
                        color: "white",
                        "& .MuiAutocomplete-listbox": {
                            padding: "8px",
                            "& .MuiAutocomplete-option": {
                                borderRadius: "8px",
                                margin: "4px 0",
                                "&:hover": { background: "rgba(255,255,255,0.1) !important" },
                                '&[aria-selected="true"]': { background: "rgba(255,255,255,0.15) !important" }
                            }
                        }
                    }}>
                        {children}
                    </Box>
                )}
            />
            <IconButton
                onClick={handleSearch}
                sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "white", backgroundColor: "transparent" }
                }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
};