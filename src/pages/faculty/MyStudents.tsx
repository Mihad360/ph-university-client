import { useParams } from "react-router-dom";
import { useGetAllfacultyCoursesQuery } from "../../redux/features/faculty/facultyCourse.api";
import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { TFacultyCourse, TResponse } from "../../types";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import PHInput from "../../components/form/PHInput";
import { useUpdateStudentMarkMutation } from "../../redux/features/student/studentCourse.api";

type TTableData = Pick<TFacultyCourse, "grade" | ("_id" & { key: string })>;

const MyStudents = () => {
  const { registeredSemesterId, courseId } = useParams();
  const { data: facultyCourses } = useGetAllfacultyCoursesQuery([
    { name: "semesterRegistration", value: registeredSemesterId },
    { name: "course", value: courseId },
  ]);
  const tableData = facultyCourses?.data.map((item) => ({
    key: item._id,
    name: item.student.fullName,
    id: item.student.id,
    semesterRegistration: item.semesterRegistration._id,
    offeredCourse: item.offeredCourse._id,
    student: item.student._id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Roll/Id",
      dataIndex: "id",
    },
    {
      title: "Actions",
      key: "X",
      render: (item) => {
        return (
          <div>
            <AddMarksModal data={item}></AddMarksModal>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const AddMarksModal = ({ data: item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStudentMark] = useUpdateStudentMarkMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const studentMarkData = {
      semesterRegistration: item.semesterRegistration,
      offeredCourse: item.offeredCourse,
      student: item.student,
      courseMarks: {
        classTest1: data?.classTest1,
        midTerm: data?.midTerm,
        classTest2: data?.classTest2,
        finalTerm: data?.finalTerm,
      },
    };
    console.log(studentMarkData);
    const res = (await updateStudentMark(studentMarkData)) as TResponse<any>;
    console.log(res);
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.error?.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" htmlType="submit" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={onSubmit}>
          <PHInput name="classTest1" label="Class Test-1" type="text"></PHInput>
          <PHInput name="midTerm" label="Mid Term" type="text"></PHInput>
          <PHInput name="classTest2" label="Class Test-2" type="text"></PHInput>
          <PHInput name="finalTerm" label="Final Term" type="text"></PHInput>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
