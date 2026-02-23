import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/Context/main";
import api from "../components/Tools/axios";

const use2fa = () => {
  const AuthUser = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [show2fa, setShow2fa] = useState(false);

  async function whoAmI() {
    try {
      const { data } = await api.get("/users/whoami");
      AuthUser.image = data.image;
      AuthUser.username = data.username;
      AuthUser.isLoggedIn = true;
      AuthUser.tfwactivated = data.tfwactivated;
      setFirstTime(data.ftime);
      setRender(true);
      if (data.tfwactivated === true && data.eligible === false) {
        setShow2fa(true);
      }
    } catch (error: any) {
      setRender(true);
    }
  }

  useEffect(() => {
    whoAmI();
  }
    , []);


  return { show2fa, render, setShow2fa, firstTime };
}


export default use2fa;