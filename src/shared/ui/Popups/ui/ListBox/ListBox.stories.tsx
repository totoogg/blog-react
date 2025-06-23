import type { Meta, StoryObj } from "@storybook/react";
import { ListBox } from "./ListBox";
import React from "react";

const meta = {
  title: "shared/Popups/ListBox",
  component: ListBox,

  tags: ["autodocs"],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    value: "1",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};

export const TopLeft: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    value: "1",
    direction: "top left",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};

export const TopRight: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    direction: "top right",
    value: "1",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};

export const BottomLeft: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    value: "1",
    direction: "bottom left",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};

export const BottomRight: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    value: "1",
    direction: "bottom right",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};

export const Dark: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    value: "1",
    items: [
      { value: "1", content: "1" },
      { value: "2", content: "2" },
      { value: "3", content: "3" },
      { value: "4", content: "4" },
    ],
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
        <div className="app app_dark_theme" style={{ padding: 300 }}>
          <Story />
        </div>
      );
    },
  ],
};
