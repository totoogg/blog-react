import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
import React from "react";

const meta = {
  title: "shared/Flex",
  component: Flex,

  tags: ["autodocs"],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    direction: "column",
  },
};

export const ColumnGap4: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "4",
    direction: "column",
  },
};

export const ColumnGap8: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "8",
    direction: "column",
  },
};

export const ColumnGap16: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "16",
    direction: "column",
  },
};

export const ColumnGap32: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "32",
    direction: "column",
  },
};

export const RowGap4: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "4",
  },
};

export const RowGap8: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "8",
  },
};

export const RowGap16: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "16",
  },
};

export const RowGap32: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    gap: "32",
  },
};

export const ColumnAlignEnd: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
    align: "end",
    direction: "column",
  },
};

export const DarkRow: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </>
    ),
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
