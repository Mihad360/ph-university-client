import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType, TableProps } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<
  TAcademicDepartment,
  "name" | ("academicFaculty" & { key: string })
>;

const AcademicDepartment = () => {
  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);
  console.log(academicDepartmentData);
  const tableData: TTableData = academicDepartmentData?.data.map((item) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty,
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
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      render: (faculty) => faculty?.name || "N/A",
    },
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

export default AcademicDepartment;
