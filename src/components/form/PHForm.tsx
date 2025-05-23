import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHForm = ({
  onSubmit,
  children,
  resolver,
  defaultValues,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submit = async (data: FieldValues) => {
    await onSubmit(data);
    methods.reset();
  };

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
