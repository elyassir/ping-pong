import { Box } from "@mui/system";
import React from "react";
import { Button, Divider, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import UploadImage from "./UploadImage";
import CancelIcon from "@mui/icons-material/Cancel";
import ContainerFloat from "../Tools/ContainerFloat";
import { UserContext } from "../Context/main";
import CustomInputProfile from "./CustomInputProfile";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../Tools/axios";

interface ChangeInfoFormProps {
  data: any;
  setChangeInfo: (changeInfo: boolean) => void;
  setLoading: any;
  setSrcImage: any;
  setData: any;
  change: boolean;
}

export default function ChangeInfoForm({
  data,
  setLoading,
  setChangeInfo,
  setSrcImage,
  setData,
  change
}: ChangeInfoFormProps) {
  const [username, setUsername] = React.useState(data.username);
  const [bio, setBio] = React.useState(data.bio);
  const AuthUser = React.useContext(UserContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleUpdate() {
    try {
      if (bio !== data.bio) {
        await api.put("/users/update/bio", { bio: bio });
        setData((prev: any) => ({ ...prev, bio: bio }));
        setChangeInfo(false);
      }
    } catch (error: any) {
      toast.error("Error while updating bio");
      console.log(`error while updating info bio: ${error.message}`);
    }
    try {
      if (username !== data.username) {
        const { data: responseData } = await api.put("/users/update/username", { username: username });
        const access_token = responseData;
        localStorage.setItem("access_token", access_token);
        AuthUser.username = username;
        AuthUser.access_token = access_token;
        setData((prev: any) => ({ ...prev, username: username }));
        setChangeInfo(false);
        window.history.pushState({}, "", `/profile/${username}`);
      }
    } catch (error: any) {
      toast.error("Error while updating username");
      console.log(`error while updating info username: ${error.message}`);
    }

    try {
      if (inputRef.current?.files !== null && inputRef.current?.files !== undefined && inputRef.current?.files.length !== 0) {
        const file = inputRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const { data: imgData } = await api.post("/users/update_img", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          AuthUser.image = reader.result as string;
          setSrcImage(reader.result as string)
        }
        AuthUser.image = imgData.image;
        setChangeInfo(false);
      }
    } catch (error: any) {
      toast.error("Error while updating image");
    }

    setTimeout(
      () => {
        setLoading(false);
      }
      , 500)
  }

  return (
    <>
      <ContainerFloat change={change}>

        <Box
          className="form-popup"
          sx={{
            width: "500px",
            color: "black",
            backgroundColor: "#fcfcf6",
          }}
        >
          <Box
            sx={{ padding: "20px", borderRadius: "25px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  sx={{ textAlign: "center", marginBottom: "20px" }}
                  variant="h4"
                >
                  Update Info
                </Typography>
                <CancelIcon
                  onClick={() => {
                    setChangeInfo(false);
                  }}
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Divider
                sx={{
                  width: "100%",
                }}
              />
              <Box>
                <UploadImage inputRef={inputRef} />
              </Box>
            </Box>
            <Typography sx={{ padding: "10px 0;" }}>Username</Typography>
            <CustomInputProfile value={username} setValue={setUsername} placeholder="Enter username" />

            <Typography sx={{ padding: "10px 0;" }}>Bio</Typography>
            <TextField
              fullWidth
              onChange={(e) => {
                setBio(e.target.value);
              }}
              value={bio}
              type="text"
              placeholder="Enter bio"
              name="bio"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: "20px 0 5px",
              }}
            >
              <Button
                onClick={(e) => {
                  setLoading(true);
                  setChangeInfo(false);
                  handleUpdate();
                }}
                sx={{ margin: "5px" }}
                variant="contained"
                type="submit"
              >
                Update
              </Button>
              {
                change ? <Link to={`/`}>
                  <Button

                    sx={{ margin: "5px" }}
                    variant="contained"
                    type="submit"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Link>
                  :
                  <Button
                    onClick={
                      () => {
                        setChangeInfo(false);
                      }
                    }

                    sx={{ margin: "5px" }}
                    variant="contained"
                    type="submit"
                    color="error"
                  >
                    Cancel
                  </Button>
              }
            </Box>
          </Box>
        </Box>
      </ContainerFloat>

    </>
  );
}
