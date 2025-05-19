import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { StoreProvider } from "app/providers/StoryProvider";

const meta = {
  title: "features/LoginForm",
  component: LoginForm,

  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        initialState={{
          loginForm: {
            username: "123",
            password: "123",
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

export const WithError: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        initialState={{
          loginForm: {
            username: "123",
            password: "123",
            error: "ERROR",
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

export const Loading: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        initialState={{
          loginForm: {
            isLoading: true,
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
