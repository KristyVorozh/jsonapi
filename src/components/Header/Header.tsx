import { Space, Button } from "antd";
import { logoutApi } from "../../api/api.service";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = async () => {
    await logoutApi(token ?? "");
    navigate("/");
  };

  return (
    <Space>
      {!token && (
        <>
          <Button href="/">About us</Button>
          <Button href="/signIn">Sign in</Button>
        </>
      )}
      {token && (
        <>
          <Button href="/">About us</Button>
          <Button href="/profile">Profile</Button>
          <Button onClick={logout}>Sign out</Button>
        </>
      )}
    </Space>
  );
};

export default Header;
