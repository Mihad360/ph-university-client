import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import {
  useGetAllSemesterRegistrationQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
import dayjs from "dayjs";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { TQueryParam, TResponse } from "../../../types";

export type TTableData = Pick<
  TSemesterRegistration,
  | "status"
  | "startDate"
  | "endDate"
  | "academicSemester"
  | "minCredit"
  | ("maxCredit" & { key: string; })
>;

const items = [
  {
    label: "upcoming",
    key: "UPCOMING",
  },
  {
    label: "ongoing",
    key: "ONGOING",
  },
  {
    label: "ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const { data: registeredSemesters } =
    useGetAllSemesterRegistrationQuery(params);
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();
  const tableData = registeredSemesters?.data.map((item) => ({
    key: item._id,
    status: item.status,
    startDate: `${dayjs(item.startDate.split("T")[0]).format("MMMM D, YYYY")}`,
    endDate: `${dayjs(item.endDate.split("T")[0]).format("MMMM D, YYYY")}`,
    minCredit: item.minCredit,
    maxCredit: item.maxCredit,
    academicSemester: `${item.academicSemester?.name} - ${item.academicSemester.year}`,
  }));

  const handleStatusUpdate = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const updateData = {
      id: semesterId,
      data: { status: data?.key },
    };
    console.log(updateData, semesterId);
    const res = (await updateRegisteredSemester(updateData)) as TResponse<any>;
    console.log(res);
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 3000 });
    } else {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 4000 });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Registered Semester",
      dataIndex: "academicSemester",
      // key: "academicSemester",
      // filters: [
      //   {
      //     text: "Autumn",
      //     value: "Autumn",
      //   },
      //   {
      //     text: "Summer",
      //     value: "Summer",
      //   },
      //   {
      //     text: "Fall",
      //     value: "Fall",
      //   },
      // ],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "upcoming",
          value: "UPCOMING",
        },
        {
          text: "ongoing",
          value: "ONGOING",
        },
        {
          text: "ended",
          value: "ENDED",
        },
      ],
      render: (item) => {
        return (
          <Tag
            color={
              item === "UPCOMING"
                ? "green"
                : item === "ONGOING"
                ? "yellow"
                : "red"
            }
          >
            {item}
          </Tag>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Minimum Credit",
      dataIndex: "minCredit",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
    },
    {
      title: "Actions",
      key: "X",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
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
    if (extra.action === "filter") {
      console.log(filters.rawAcademicSemester);
      const queryParams: TQueryParam[] = [];
      filters.status?.forEach((item) => {
        queryParams.push({ name: "status", value: item });
      });
      setParams(queryParams);
    }
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

export default RegisteredSemesters;
