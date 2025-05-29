import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import React from "react";
import { Text } from "../Text/Text";

const meta = {
  title: "shared/Card",
  component: Card,

  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    children: <Text title="test" text="text text" />,
  },
};

export const Dark: Story = {
  args: {
    children: <Text title="test" text="text text" />,
  },
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
