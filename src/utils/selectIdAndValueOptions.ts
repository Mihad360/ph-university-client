export const selectSemesterOptions = (data) => {
  return data?.map((item) => ({
    label: `${item.name} - ${item.year}`,
    value: item._id,
  }));
};

export const selectFacultyOptions = (data) => {
  return data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectDepartmentOptions = (data) => {
  return data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectValueOptions = (data) => {
  return data?.map((item) => ({
    label: item,
    value: item,
  }));
};
