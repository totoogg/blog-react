import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    "../../src/**/*.mdx",
    "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: ["@storybook/addon-webpack5-compiler-swc", {
    name: "@storybook/addon-essentials",
    options: {
      backgrounds: false,
    },
  }, "@storybook/addon-onboarding", "@storybook/addon-interactions", "msw-storybook-addon", "storybook-addon-themes", "@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  staticDirs: ["./mock"],

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};

export default config;
