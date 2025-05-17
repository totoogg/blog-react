import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  elem?: HTMLElement;
}

export const Portal: FC<PortalProps> = ({ children, elem = document.body }) => {
  return createPortal(children, elem);
};
