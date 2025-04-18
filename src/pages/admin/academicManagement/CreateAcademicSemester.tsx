import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../validations/academicManagement.schema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const onSubmit = async (data: FieldValues) => {
    const name = semesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = await createAcademicSemester(semesterData);
      if(res?.data?.success === true){
        toast.success(res?.data.message)
      }
    } catch (error) {
        toast.error('Academic semester create failed')
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            options={semesterOptions}
            name="name"
            type="text"
            label="Name"
          ></PHSelect>
          <PHSelect
            options={yearOptions}
            name="year"
            type="text"
            label="Year"
          ></PHSelect>
          <PHSelect
            options={monthOptions}
            name="startMonth"
            type="text"
            label="Start Month"
          ></PHSelect>
          <PHSelect
            options={monthOptions}
            name="endMonth"
            type="text"
            label="End Month"
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
