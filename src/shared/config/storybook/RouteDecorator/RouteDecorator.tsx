import { ReactNode } from "react";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

export interface RouterDecoratorProps {
  children: ReactNode;
}
const RouterDecorator: FC<RouterDecoratorProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterDecorator;
