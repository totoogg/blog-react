import type { Meta, StoryObj } from "@storybook/react";
import AddCommentForm from "./AddCommentForm";
import React from "react";
import { action } from "@storybook/addon-actions";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { addCommentFormReducer } from "../../model/slice/addCommentFormSlice";
import { DeepPartial } from "shared/lib/deepPartial/deepPartial";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  addCommentForm: addCommentFormReducer,
};

const meta = {
  title: "features/AddCommentForm",
  component: AddCommentForm,

  tags: ["autodocs"],
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    onSendComment: action("onSendComment"),
  },
  decorators: [
    (Story) => (
      <StoreProvider asyncReducers={defaultAsyncReducers} initialState={{}}>
        <div className="app">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};

export const Dark: Story = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.body.classList.add("app_dark_theme");
        return () => {
          document.body.classList.remove("app_dark_theme");
        };
      }, []);

      return (
        <StoreProvider asyncReducers={defaultAsyncReducers} initialState={{}}>
          <div className="app app_dark_theme">
            <Story />
          </div>
        </StoreProvider>
      );
    },
  ],
};
