import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import {
  selectSemesterOptions,
  selectValueOptions,
} from "../../../utils/selectIdAndValueOptions";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { status } from "../../../constants/semester";
import dayjs from "dayjs";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const statusOptions = selectValueOptions(status);

const SemesterRegistration = () => {
  const { data: academicSemesters } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();
  const semesterOptions = selectSemesterOptions(academicSemesters?.data);
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const semesterData = {
      ...data,
      maxCredit: Number(data?.maxCredit),
      minCredit: Number(data?.minCredit),
      startDate: dayjs(data?.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(data?.endDate).format("YYYY-MM-DD"),
    };
    const res = (await createSemesterRegistration(
      semesterData
    )) as TResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.error?.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <PHForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            options={semesterOptions}
            name="academicSemester"
            type="text"
            label="Academic Semester"
          ></PHSelect>
          <PHSelect
            options={statusOptions}
            name="status"
            type="text"
            label="Status"
          ></PHSelect>
          <PHInput
            name="minCredit"
            type="text"
            label="Minimum Credit"
          ></PHInput>
          <PHInput name="maxCredit" type="text" label="Max Credit"></PHInput>
          <PHDatePicker
            name="startDate"
            type="number"
            label="Start Date"
          ></PHDatePicker>
          <PHDatePicker
            name="endDate"
            type="number"
            label="End Date"
          ></PHDatePicker>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
