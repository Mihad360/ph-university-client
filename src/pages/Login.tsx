import { Button, Card, Form, Input, Layout, Typography } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [createLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: { userId: string; password: string }) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await createLogin(userInfo).unwrap();
    const decoded = verifyToken(res?.data.accessToken)
    console.log(decoded);
    dispatch(setUser({ user: decoded, token: res?.data.accessToken }));
  };

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content
        style={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          title={
            <Title level={2} style={{ textAlign: "center" }}>
              Login
            </Title>
          }
          style={{
            width: 400,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e8e8e8",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item label="User ID" style={{ marginBottom: 16 }}>
              <input
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  borderColor: "skyblue",
                }}
                {...register("userId")}
                id="userId"
                placeholder="Enter your ID"
              />
            </Form.Item>
            <Form.Item label="Password" style={{ marginBottom: 24 }}>
              <input
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  borderColor: "skyblue",
                }}
                {...register("password")}
                id="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
