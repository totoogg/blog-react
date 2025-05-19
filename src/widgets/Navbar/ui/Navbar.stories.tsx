import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { StoreProvider } from "app/providers/StoryProvider";

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
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
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
        <div className="app dark">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};
