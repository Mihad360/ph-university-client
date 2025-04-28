import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user;
  if (token) {
    const response = verifyToken(token) as TUser;
    user = response;
  }
  if (role !== undefined && user?.role !== role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
