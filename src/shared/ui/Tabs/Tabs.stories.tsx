import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta = {
  title: "Tabs/Tabs",
  component: Tabs,

  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tabs: [
      {
        value: "tab1",
        content: "tab1",
      },
      {
        value: "tab2",
        content: "tab2",
      },
      {
        value: "tab3",
        content: "tab3",
      },
    ],
    value: "tab2",
    onTabClick: action("onTabsClick"),
  },
};

export const Dark: Story = {
  args: {
    tabs: [
      {
        value: "tab1",
        content: "tab1",
      },
      {
        value: "tab2",
        content: "tab2",
      },
      {
        value: "tab3",
        content: "tab3",
      },
    ],
    value: "tab2",
    onTabClick: action("onTabsClick"),
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
