import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useEffect } from "react";
import { Theme, ThemeProvider } from "@/app/providers/ThemeProvider";

const meta = {
  title: "shared/ThemeSwitcher",
  component: ThemeSwitcher,

  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  decorators: [
    (Story) => {
      return (
        <ThemeProvider initialTheme={Theme.DARK}>
          <div className="app">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export const Dark: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add("app_dark_theme");
        return () => {
          document.body.classList.remove("app_dark_theme");
        };
      }, []);

      return (
        <ThemeProvider initialTheme={Theme.LIGHT}>
          <div className="app app_dark_theme">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};
