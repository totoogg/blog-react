import webpack, { DefinePlugin } from "webpack";
import { BuildPaths } from "../build/types/config";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import path from "path";
import { buildSvgLoader } from "../build/loaders/buildSvgLoader";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: "",
    html: "",
    entry: "",
    buildLocales: "",
    locales: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  const rootPath = path.resolve(__dirname, "..", "..");

  config.resolve = config.resolve || {};
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    paths.src,
    "node_modules",
  ];

  config.resolve.extensions = [
    ...(config.resolve.extensions || []),
    ".ts",
    ".tsx",
    ".js",
  ];

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    react: path.resolve(rootPath, "node_modules", "react"),
    "react-dom": path.resolve(rootPath, "node_modules", "react-dom"),
    "@reduxjs/toolkit": path.resolve(
      rootPath,
      "node_modules",
      "@reduxjs/toolkit"
    ),
    "@/app": path.resolve(paths.src, "app"),
    "@/features": path.resolve(paths.src, "features"),
    "@/entities": path.resolve(paths.src, "entities"),
    "@/widgets": path.resolve(paths.src, "widgets"),
    "@/pages": path.resolve(paths.src, "pages"),
    "@/shared": path.resolve(paths.src, "shared"),
  };

  config.module = config.module || { rules: [] };
  config.module.rules = config.module.rules?.map((rule) => {
    if (
      rule &&
      typeof rule === "object" &&
      "test" in rule &&
      rule.test instanceof RegExp &&
      rule.test.toString().includes("svg")
    ) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config.module.rules?.push(buildCssLoader(true));
  config.module.rules?.push(buildSvgLoader());

  config.plugins = config.plugins || [];
  config.plugins.push(
    new DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify("https://testapi.com"),
      __PROJECT__: JSON.stringify("storybook"),
    })
  );

  return config;
};
