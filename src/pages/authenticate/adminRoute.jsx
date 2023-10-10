import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // const [userInfo, setUserInfo] = useState({});
  const { email, role, userName } = useSelector((state) => state.user);
  // const { checkUser } = userAPI();

  // useEffect(() => {
  //   setUserInfo({ email, role, userInfo });
  // }, [email, role, userName]);

  return role == 1 ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
