import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPhseletProps = {
  label: string;
  type?: string;
  name: string;
  disabled?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  mode?: "multiple" | undefined;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TPhseletProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);
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

export default PHSelectWithWatch;
