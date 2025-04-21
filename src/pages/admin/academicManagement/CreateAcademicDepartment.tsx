import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data: academicFaculties } = useGetAllAcademicFacultyQuery(undefined);
  const [CreateAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const academicFacultyOptions = academicFaculties?.data.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Loading!!", { duration: 2000 });
    try {
      const academicDepartmentInfo = {
        name: data.name,
        academicFaculty: data.academicFaculty,
      };
      const res = await CreateAcademicDepartment(academicDepartmentInfo);
      if (res?.data.success) {
        toast.success(res?.data.message, { id: toastId, duration: 2000 });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Academic Department create failed", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            name="name"
            type="text"
            label="Academic Department"
          ></PHInput>
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
