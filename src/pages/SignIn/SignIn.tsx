import Header from "../../components/Header/Header";
import { Wrapper } from "../../main.styled";
import { Space } from "antd";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <Wrapper>
      <Space size={20} direction="vertical">
        <Header />
        <SignInForm />
      </Space>
    </Wrapper>
  );
};

export default SignIn;
