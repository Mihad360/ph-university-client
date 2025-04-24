import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useGetAllStudentsQuery,
  useUpdateStudentStatusMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { toast } from "sonner";

export type TTableData = Pick<
  TStudent,
  | "email"
  | "id"
  | "fullName"
  | "contactNumber"
  | "user"
  | ("profileImg" & { key: string })
>;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const [updateStudentStatus] = useUpdateStudentStatusMutation();
  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, email, id, fullName, profileImg, contactNumber, user }) => ({
      key: _id,
      email,
      id,
      fullName,
      profileImg,
      contactNumber,
      user,
      status: user?.status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Profile Image",
      dataIndex: "profileImg",
      render: (img) => {
        return (
          <div>
            <img
              src={img}
              alt="Profile"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      key: "X",
      render: (item) => {
        const handleBlock = async () => {
          const toastId = toast.loading("Loading!!");
          const status = {
            status: "blocked",
          };
          const res = await updateStudentStatus({ id: item?.key, ...status });
          if (res?.data.success) {
            toast.success(res?.data.message, { id: toastId, duration: 2000 });
          } else {
            toast.error(res?.data.message, { id: toastId, duration: 2000 });
          }
        };
        return (
          <Space>
            <Link to={`/admin/student-detail/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/update-student/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <ConfirmModal
              buttonText={item?.status === "blocked" ? "Blocked" : "Block"}
              buttonType="primary"
              modalTitle={`Block ❌ ${item.fullName}`}
              onConfirm={handleBlock}
              modalContent={
                <>
                  <p>Are you sure you want to block {item.fullName}?</p>
                  <p>This action will restrict their access to the system.</p>
                </>
              }
              okText="Block Student"
              cancelText="Cancel"
            />
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        align="center"
        pageSize={metaData?.limit}
      ></Pagination>
    </>
  );
};

export default StudentData;
