import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useAssignCourseToFacultiesMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { selectFacultiesOptions } from "../../../utils/selectIdAndValueOptions";
import { useState } from "react";
import { TResponse } from "../../../types";

export type TTableData = Pick<
  TCourse,
  "title" | "code" | "credits" | ("prefix" & { key: string })
>;

const Courses = () => {
  const { data: courses } = useGetAllCourseQuery(undefined);
  const tableData = courses?.data.map((item) => ({
    key: item._id,
    title: item.title,
    credits: item.credits,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
      //   filters: [
      //     {
      //       text: "upcoming",
      //       value: "UPCOMING",
      //     },
      //     {
      //       text: "ongoing",
      //       value: "ONGOING",
      //     },
      //     {
      //       text: "ended",
      //       value: "ENDED",
      //     },
      //   ],
    },
    {
      title: "Total Credits",
      dataIndex: "credits",
    },
    {
      title: "Actions",
      key: "X",
      render: (item) => {
        return <AddFacultyModal data={item}></AddFacultyModal>;
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
    // if (extra.action === "filter") {
    //   console.log(filters.rawAcademicSemester);
    //   const queryParams: TQueryParam[] = [];
    //   filters.status?.forEach((item) => {
    //     queryParams.push({ name: "status", value: item });
    //   });
    //   setParams(queryParams);
    // }
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

const AddFacultyModal = ({ data: item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [assignCourseToFaculty] = useAssignCourseToFacultiesMutation();
  const facultyOptions = selectFacultiesOptions(faculties?.data);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const facultyData = {
      id: item?.key,
      data: data,
    };
    const res = (await assignCourseToFaculty(facultyData)) as TResponse<any>;
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
          <PHSelect
            mode="multiple"
            label="Assign Faculties"
            name="faculties"
            type="text"
            options={facultyOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
