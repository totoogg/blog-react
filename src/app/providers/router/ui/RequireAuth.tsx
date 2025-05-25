import { getUserAuthData } from "entities/User";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RouterPath } from "shared/config/routerConfig/routerConfig";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RouterPath.main} state={{ from: location }} replace />;
  }

  return children;
}
