import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { http, HttpResponse } from 'msw';

const meta = {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,

  tags: ['autodocs'],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rate: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/notifications', () => {
          return HttpResponse.json([
            { id: '1', title: 'Notification 1', description: 'Description 1' },
            { id: '1', title: 'Notification 1', description: 'Description 1' },
            { id: '1', title: 'Notification 1', description: 'Description 1' },
          ]);
        }),
      ],
    },
  },
};
