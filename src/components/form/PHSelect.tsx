import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhseletProps = {
  label: string;
  type?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: TPhseletProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
          />
          <small style={{ color: "red" }}>{error ? error.message : null}</small>
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
