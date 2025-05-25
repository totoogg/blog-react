import { writeFileSync } from "fs";
import process from "process";

const componentName = process.argv[2];

const templates = {
  [`${componentName}.tsx`]: `import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./${componentName}.module.scss";

interface ${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<${componentName}Props> = ({ className }) => {
  return <span className={classNames(cls.${
    componentName[0].toLowerCase() + componentName.slice(1)
  }, {}, [className])}></span>;
};
`,
  [`${componentName}.module.scss`]: `.${componentName.toLowerCase()} {  }`,
  [`${componentName}.stories.tsx`]: `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";
import React from "react";

const meta = {
  title: "${componentName}/${componentName}",
  component: ${componentName},

  tags: ["autodocs"],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Dark: Story = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.body.classList.add("app_dark_theme");
        return () => {
          document.body.classList.remove("app_dark_theme");
        };
      }, []);

      return (
        <div className="app app_dark_theme">
          <Story />
        </div>
      );
    },
  ],
};
`,
};

Object.entries(templates).forEach(([fileName, content]) => {
  writeFileSync(`generator/component/${fileName}`, content);
});
