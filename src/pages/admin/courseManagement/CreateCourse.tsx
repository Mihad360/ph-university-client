import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { selectCourseOptions } from "../../../utils/selectIdAndValueOptions";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCourseQuery(undefined);
  const [createCourse] = useCreateCourseMutation();
  console.log(courses);
  const courseOptions = selectCourseOptions(courses?.data);
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const courseData = {
      ...data,
      code: Number(data?.code),
      credits: Number(data?.credits),
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses.map((item: string) => ({
            course: item,
          }))
        : [],
    };
    console.log(courseData);
    const res = (await createCourse(courseData)) as TResponse<any>;
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
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="title" type="text" label="Title"></PHInput>
          <PHInput name="prefix" type="text" label="Prefix"></PHInput>
          <PHInput name="code" type="text" label="Code"></PHInput>
          <PHInput name="credits" type="text" label="Credits"></PHInput>
          <PHSelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={courseOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
