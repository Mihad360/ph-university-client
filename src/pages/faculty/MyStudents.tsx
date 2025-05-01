import { useParams } from "react-router-dom";
import { useGetAllfacultyCoursesQuery } from "../../redux/features/faculty/facultyCourse.api";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TFacultyCourse } from "../../types";

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
            <Button>Update</Button>
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

export default MyStudents;
