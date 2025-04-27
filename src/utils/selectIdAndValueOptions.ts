export const selectSemesterOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: `${item.name} - ${item.year}`,
    value: item._id,
  }));
};

export const selectFacultyOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectFacultiesOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.fullName,
    value: item._id,
  }));
};

export const selectCourseOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.title,
    value: item._id,
  }));
};

export const selectDepartmentOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectSemRegistrationOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: `${item.academicSemester.name} - ${item.academicSemester.year} - ${item.status}`,
    value: item._id,
  }));
};

export const selectValueOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item,
    value: item,
  }));
};
