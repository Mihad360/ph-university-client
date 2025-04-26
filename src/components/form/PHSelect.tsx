import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhseletProps = {
  label: string;
  type?: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined
  options: { value: string; label: string; disabled?: boolean, }[];
};

const PHSelect = ({ label, name, options, disabled , mode}: TPhseletProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
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
