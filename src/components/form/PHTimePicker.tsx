import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  type?: string;
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TTimePickerProps) => {
  const format = "hh:mm";

  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              format={format}
              size="large"
              style={{ width: "100%" }}
              {...field}
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

export default PHTimePicker;
