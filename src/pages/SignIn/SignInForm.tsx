import { Input, Typography, Button, Form, notification } from "antd";
import { postAuth } from "../../api/api.service";
import { TAuthBody } from "../../types/api.types";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const onFinish = async (values: TAuthBody) => {
    const { data, success } = await postAuth(values);

    if (!success) {
      return api.info({
        message: `Wrong password or email`,
      });
    }

    localStorage.setItem("token", data.token);
    navigate("/profile");
  };

  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 18 }}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        aria-autocomplete="none"
        layout="vertical"
        style={{ width: 600 }}
      >
        <Form.Item
          style={{ marginBottom: 10 }}
          label="Email adress"
          name="email"
          rules={[
            { required: true, message: "Please input your email adress!" },
          ]}
        >
          <Input autoComplete="new-email" />
        </Form.Item>
        <Typography style={{ marginBottom: "15px", color: "#0000004f" }}>
          We'll never share your email with anyone else
        </Typography>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input autoComplete="new-password" type="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignInForm;
