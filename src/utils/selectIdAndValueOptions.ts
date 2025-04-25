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

export const selectDepartmentOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectValueOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item,
    value: item,
  }));
};
