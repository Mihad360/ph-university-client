import { Button, Card, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../redux/features/student/studentCourse.api";
import { toast } from "sonner";
import { TResponse } from "../../types";

type TCourse = {
  [index: string]: any;
};

const MyOfferedCourse = () => {
  const { data: myOfferedCoursesData } = useGetMyOfferedCoursesQuery(undefined);
  const [enrollCourse] = useEnrollCourseMutation();

  const singleObject = myOfferedCoursesData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        startTime: item.startTime,
        endTime: item.endTime,
        maxCapacity: item.maxCapacity,
        days: item.days,
      });

      return acc;
    },
    {}
  );
  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnrollCourse = async (id: string) => {
    const toastId = toast.loading("Loading!!!");
    const enrollData = {
      offeredCourse: id,
    };
    const res = (await enrollCourse(enrollData)) as TResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  if (!modifiedData.length) {
    return <p>No offered course available</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {modifiedData?.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h1>{item.courseTitle}</h1>
          <Row gutter={[16, 16]}>
            {item.sections.map((sec: any) => (
              <Col xs={24} sm={12} md={8} lg={6} key={sec._id}>
                <Card title={`Section: ${sec.section}`} hoverable>
                  <p>
                    {sec.startTime} - {sec.endTime}
                  </p>
                  <p>{sec.days.join(", ")}</p>
                  <p>{sec.maxCapacity}</p>
                  <Button
                    onClick={() => handleEnrollCourse(sec._id)}
                    type="primary"
                  >
                    Enroll
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default MyOfferedCourse;
