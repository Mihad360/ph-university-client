import { Button, Card, Layout, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [createLogin] = useLoginMutation();
  // const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in", { duration: 2000 });
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await createLogin(userInfo).unwrap();
      const decoded = verifyToken(res?.data.accessToken) as TUser;
      dispatch(setUser({ user: decoded, token: res?.data.accessToken }));
      navigate(`/${decoded.role}/dashboard`);
      toast.success("Logged In Successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Logged in failed", { id: toastId, duration: 2000 });
      console.log(error);
    }
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
          <PHForm onSubmit={onSubmit}>
            <PHInput label="User Id" type="text" name="userId"></PHInput>
            <PHInput label="Password" type="text" name="password"></PHInput>
            <Button
              style={{ marginTop: "15px" }}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Login
            </Button>
          </PHForm>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
