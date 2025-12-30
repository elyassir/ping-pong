import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';

const api = process.env.REACT_APP_API_URL + "/auth/google"

export default function SignIn() {
  return (
    <Stack sx={{ justifyContent: "center" }}>
      <a
        style={
          {
            backgroundColor: "#24A8AF",
            color: "#fcfcf6",
            borderRadius: "15px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            transition: "all 0.2s ease-in-out",
            letterSpacing: "1px",
            fontFamily: "Rubik",
            // '&:hover': {
            //   backgroundColor: "#166569",
            // }
          }
        } href={api} >Login To Continue

        <LoginIcon sx={{ marginLeft: "10px" }} />

      </a>
    </Stack>
  );
}