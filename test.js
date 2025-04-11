const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "akljsflsfd",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "asgfasgasg",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "agasgas",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "asgagasg",
      },
    ],
  },
];

const newArray = adminPaths2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: item.path,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map(child => ({
        key: child.name,
        path: child.path
      })),
    });
  }
  return acc;
}, []);

console.log(newArray);
