import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHForm = ({ onSubmit, children, resolver }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submit = (data: FieldValues) => {
    onSubmit(data)
    methods.reset()
  }

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          layout="vertical"
          action=""
          onFinish={methods.handleSubmit(submit)}
        >
          {children}
        </Form>
      </FormProvider>
    </div>
  );
};

export default PHForm;
