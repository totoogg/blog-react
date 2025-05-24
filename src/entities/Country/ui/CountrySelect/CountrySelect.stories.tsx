import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { CountrySelect } from "./CountrySelect";

const meta = {
  title: "entities/CurrencySelect",
  component: CountrySelect,

  tags: ["autodocs"],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [
    (Story) => {
      useEffect(() => {
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
