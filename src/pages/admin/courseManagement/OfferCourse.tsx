import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  selectCourseOptions,
  selectDepartmentOptions,
  selectFacultiesOptions,
  selectFacultyOptions,
  selectSemRegistrationOptions,
  selectValueOptions,
} from "../../../utils/selectIdAndValueOptions";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { days } from "../../../constants/global";
import {
  useCreateOfferCourseMutation,
  useGetAllCourseQuery,
  useGetAllSemesterRegistrationQuery,
  useGetCourseAssignedFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHTimePicker from "../../../components/form/PHTimePicker";
import dayjs from "dayjs";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const daysOptions = selectValueOptions(days);

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: academicFacultyData, isLoading: afIsLoading } =
    useGetAllAcademicFacultyQuery(undefined);
  const { data: semesterRegistrationData, isLoading: srIsLoading } =
    useGetAllSemesterRegistrationQuery([{ name: "sort", value: "year" }], {
      skip: afIsLoading,
    });
  const { data: academicDepartmentData, isLoading: asIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: srIsLoading });
  const { data: courseData } = useGetAllCourseQuery(undefined, {
    skip: asIsLoading,
  });
  const { data: assignedFaculties } = useGetCourseAssignedFacultiesQuery(id, {
    skip: !id,
  });
  const [createOfferCourse] = useCreateOfferCourseMutation();
  const academicFacultyOptions = selectFacultyOptions(
    academicFacultyData?.data
  );
  const semesterRegistrationOptions = selectSemRegistrationOptions(
    semesterRegistrationData?.data
  );
  const academicDepartmentOptions = selectDepartmentOptions(
    academicDepartmentData?.data
  );
  const courseOptions = selectCourseOptions(courseData?.data);
  const facultyOptions = selectFacultiesOptions(
    assignedFaculties?.data?.faculties
  );
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const offerCourseData = {
      ...data,
      maxCapacity: Number(data?.maxCapacity),
      section: Number(data?.section),
      startTime: dayjs(data?.startTime).format("hh:mm"),
      endTime: dayjs(data?.endTime).format("hh:mm"),
    };
    const res = (await createOfferCourse(offerCourseData)) as TResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.error?.data.message, {
        id: toastId,
        duration: 4000,
      });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={10}>
            <Col span={24} md={{ span: 11 }}>
              <PHSelect
                options={academicFacultyOptions}
                name="academicFaculty"
                type="text"
                label="Academic Faculty"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHSelect
                options={semesterRegistrationOptions}
                name="semesterRegistration"
                type="text"
                label="Semester Registration"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHSelect
                options={academicDepartmentOptions}
                name="academicDepartment"
                type="text"
                label="Academic Department"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHSelectWithWatch
                onValueChange={setId}
                label="Course"
                name="course"
                options={courseOptions}
              ></PHSelectWithWatch>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHSelect
                disabled={!id}
                options={facultyOptions}
                name="faculty"
                type="text"
                label="Faculty"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHInput
                name="maxCapacity"
                type="text"
                label="Max Capacity"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHInput name="section" type="text" label="Section"></PHInput>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHSelect
                mode="multiple"
                options={daysOptions}
                name="days"
                type="text"
                label="Days"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHTimePicker name="startTime" label="Start Time"></PHTimePicker>
            </Col>
            <Col span={24} md={{ span: 11 }}>
              <PHTimePicker name="endTime" label="End Time"></PHTimePicker>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default OfferCourse;
