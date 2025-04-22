import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhseletProps = {
  label: string;
  type?: string;
  name: string;
  disabled?: boolean
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options, disabled }: TPhseletProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            placeholder={`Select a ${label}`}
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
          />
          <small style={{ color: "red" }}>{error ? error.message : null}</small>
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
