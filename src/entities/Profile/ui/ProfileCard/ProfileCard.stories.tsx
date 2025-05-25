import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "./ProfileCard";
import { Country } from "entities/Country";
import Avatar from "shared/assets/tests/storybook.jpg";

const meta = {
  title: "entities/ProfileCard",
  component: ProfileCard,

  tags: ["autodocs"],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
      username: "DmitrySmit",
      age: 35,
      country: Country.Russia,
      lastname: "Smit",
      first: "Dmitry",
      city: "Tver",
      avatar: Avatar,
    },
  },
};

export const WithError: Story = {
  args: {
    error: "Error",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
