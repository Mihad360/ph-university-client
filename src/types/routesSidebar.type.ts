import { ReactNode } from "react";

export type TSideBarItems = {
  key: string;
  label: ReactNode;
  children?: TSideBarItems[];
};

export type TItems = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TItems[];
};

export type TRoutes = {
  path: string;
  element: ReactNode;
};
