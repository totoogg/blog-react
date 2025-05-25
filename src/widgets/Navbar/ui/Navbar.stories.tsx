import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { StoreProvider } from "app/providers/StoreProvider";
import { useEffect } from "react";

const meta = {
  title: "widgets/NavBar",
  component: Navbar,

  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

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
        <div className="app app_dark_theme">
          <Story />
        </div>
      );
    },
  ],
};

export const AuthNavbar: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        initialState={{
          user: {
            authData: {},
          },
        }}
      >
        <div className="app">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};
