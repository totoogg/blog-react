import { FC, lazy } from "react";
import { LoginModalProps } from "../LoginModal/LoginModal";

export const LoginFormAsync = lazy<FC<LoginModalProps>>(
  () => import("./LoginForm")
);
