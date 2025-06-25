import { FC, SVGAttributes } from 'react';

export interface SidebarItemType {
  text: string;
  path: string;
  Icon: FC<SVGAttributes<SVGElement>>;
  authOnly?: boolean;
}
