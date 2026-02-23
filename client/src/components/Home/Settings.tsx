import { Box, TextField } from "@mui/material";
import ContainerFloat from "../Tools/ContainerFloat";
import React, { useContext } from "react";
import { UserContext } from "../Context/main";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import api from "../Tools/axios";



export default function SettingsComponent({ setDisplaySettings }: any) {
    const AuthUser = useContext(UserContext);
    const [isActivated, setIsActivated] = React.useState(AuthUser.tfwactivated);
    const [qrCodeURL, setQrCodeURL] = React.useState("");
    const [code, setCode] = React.useState("");
    const [validated, setValidated] = React.useState(AuthUser.tfwactivated);

    const handleTwoFactorAuth = async () => {
        try {
            const { data } = await api.get("/2fa/enable");
            setQrCodeURL(data.qrCodeURL);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDisableTwoFactorAuth = async () => {
        try {
            await api.post("/2fa/disable");
            setValidated(false);
            setIsActivated(false);
            toast.success("2fa disabled");
        } catch (error: any) {
            console.log(error);
        }
    }


    const handleBarCode = async (code: string) => {
        try {
            const { data } = await api.post("/2fa/verify", { token: code });
            toast.success("2fa enabled");
            AuthUser.access_token = data.access_token;
            window.localStorage.setItem("access_token", data.access_token);
            setValidated(true);
        }
        catch (error: any) {
            toast.error(`Error: code is invalid`)
            console.log(error);
        }
    }


    return (
        <ContainerFloat>
            <Box sx={
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "white",
                    minWidth: "500px",
                    color: "black",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    fontFamily: "Poppins",
                    fontWeight: "bold"
                }
            }>

                <section className="cw-section">
                    <div >
                        <h2 style={
                            {
                                fontSize: "1.5rem",
                                textAlign: "center",
                            }
                        }>Settings</h2>
                    </div>

                    <article className="cw-accordion__item">

                        <div style={
                            {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }
                        } className={` ${!validated ? isActivated ? "cw-open" : "" : ""}`}>Two-factor authentication (2fa)



                            <a onClick={
                                () => {
                                    if (isActivated === false) {
                                        handleTwoFactorAuth();
                                    } else {
                                        handleDisableTwoFactorAuth();
                                    }
                                    setIsActivated(!isActivated)
                                }

                            } className="contact-btn">
                                {
                                    isActivated ? "Disable" : "Enable"
                                }
                            </a>
                        </div>

                        <div className="cw-acordion-cont">
                            <Box>
                                <p>Two-factor authentication adds an extra layer of security to your account. Once enabled, you will be required to enter a unique code alongside your password when you sign in.</p>
                                <ul>
                                    <li>Install the following application on your mobile: Google Authenticator</li>
                                    <li>Open the application and scan the QR code</li>
                                    <div id="qrcode">
                                        <QRCode
                                            size={256}
                                            style={{}}
                                            value={qrCodeURL}
                                        />

                                    </div>
                                    <li>Enter the code</li>
                                    <TextField label="code ..." variant="standard" value={code} onChange={(e) => setCode(e.target.value)} />
                                </ul>

                            </Box>
                            <div className="faq-contact">
                                <a className="contact-btn" onClick={
                                    () => {
                                        handleBarCode(code);
                                    }
                                }
                                >Validate</a>
                            </div>
                        </div>
                    </article>
                    <div className="faq-contact">
                        <a onClick={
                            () => {
                                setDisplaySettings(false);
                            }

                        } className="contact-btn">Close</a>
                    </div>
                </section>

                {/* <Typography variant="h4" style={{
            marginBottom: "20px",
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "black"
          }}>Settings</Typography>
    <Box>            
          </Box> */}

            </Box>
        </ContainerFloat>
    )
}