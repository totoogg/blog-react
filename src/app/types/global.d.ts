declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const className: IClassNames;
  export = className;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGAttributes<SVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: "storybook" | "frontend" | "jest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
