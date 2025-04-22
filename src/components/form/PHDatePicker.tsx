import { DatePicker, Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  type?: string;
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
            size="large"
            style={{width: '100%'}}
              {...field}
              placeholder={`Enter your ${label ? label : null}`}
            //   picker="month"
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

export default PHDatePicker;
