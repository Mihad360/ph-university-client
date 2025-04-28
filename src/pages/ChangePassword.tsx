import { Button } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!!");
    const passwordData = {
      ...data,
    };
    const res = (await changePassword(passwordData)) as TResponse<any>;
    console.log(res);
    // if (res?.data?.success) {
    //   toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    // } else {
    //   toast.error(res?.error?.data.message, {
    //     id: toastId,
    //     duration: 4000,
    //   });
    // }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <p style={{color: 'red', fontSize: '18px', paddingBottom: '10px'}}>You need to update/change your password to a new password</p>
        <PHForm onSubmit={onSubmit}>
          <PHInput label="Old Password" type="text" name="oldPassword" />
          <PHInput label="New Password" type="text" name="newPassword" />
          <Button
            style={{ marginTop: "15px" }}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            Change Password
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default ChangePassword;
