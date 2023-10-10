import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const [userInfo, setUserInfo] = useState({});
  const { email, role, userName } = useSelector((state) => state.user);
  const { checkUser } = userAPI();

  useEffect(() => {
    setUserInfo({ email, role, userInfo });
  }, [email, role, userName]);

  return userInfo?.role == email ? <Outlet /> : <Navigate to="/" />;
};

export default UserRoute;
