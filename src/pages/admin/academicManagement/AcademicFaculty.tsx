import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name" & { key: string }>;

const AcademicFaculty = () => {
  const { data: facultyData } = useGetAllAcademicFacultyQuery(undefined);
  console.log(facultyData);
  const tableData: TTableData = facultyData?.data.map((item) => ({
    key: item._id,
    name: item.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    //   showSorterTooltip: { target: "full-header" },
    //   filters: [
    //     {
    //       text: "Joe",
    //       value: "Joe",
    //     },
    //     {
    //       text: "Jim",
    //       value: "Jim",
    //     },
    //   ],
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    // },
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

export default AcademicFaculty;
