import { NavLink } from "react-router-dom";
import { TItems, TSideBarItems } from "../types";

export const sidebarItemsGenerator = (items: TItems[], role: string) => {
  const sidebarItems = items.reduce((acc: TSideBarItems[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name!,
        label: item.name,
        children: item.children
          .filter((child) => child.name && child.path)
          .map((child) => ({
            key: child.name!,
            label: (
              <NavLink to={`/${role}/${child.path!}`}>{child.name}</NavLink>
            ),
          })),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};
