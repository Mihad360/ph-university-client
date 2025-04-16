import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div>
      <label>{label ? label : null}:</label>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            style={{ marginTop: "5px" }}
            {...field}
            type={type}
            id={name}
            placeholder={`Enter your ${label ? label : null}`}
          />
        )}
      />
    </div>
  );
};

export default PHInput;
