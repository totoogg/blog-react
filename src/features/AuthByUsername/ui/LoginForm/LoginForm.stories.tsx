import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { DeepPartial } from "@/shared/lib/deepPartial/deepPartial";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { loginReducer } from "../../model/slice/loginSlice";
import { fn } from "@storybook/test";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
};

const meta = {
  title: "features/LoginForm",
  component: LoginForm,

  args: { onSuccess: fn() },

  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          loginForm: {
            username: "123",
            password: "123",
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

export const WithError: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          loginForm: {
            username: "123",
            password: "123",
            error: "ERROR",
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

export const Loading: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          loginForm: {
            isLoading: true,
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
