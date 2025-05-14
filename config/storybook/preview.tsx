import { Preview } from "@storybook/react";
import "../../src/app/styles/index.scss";
import RouterDecorator from "../../src/shared/config/storybook/RouteDecorator/RouteDecorator";

const preview: Preview = {
  decorators: [
    (Story) => (
      <RouterDecorator>
        <div className="app">
          <Story />
        </div>
      </RouterDecorator>
    ),
  ],
};

export default preview;
