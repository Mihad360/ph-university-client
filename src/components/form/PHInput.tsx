import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              size="large"
              style={{ marginTop: "5px" }}
              {...field}
              type={type}
              id={name}
              placeholder={`Enter your ${label ? label : null}`}
            />
            <small style={{ color: "red" }}>
              {error ? error.message : null}
            </small>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
