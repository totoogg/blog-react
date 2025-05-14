import webpack from "webpack";
import { BuildPaths } from "../build/types/config";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import path from "path";
import { buildSvgLoader } from "../build/loaders/buildSvhLoader";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };
  config.resolve?.modules?.push(paths.src);
  config.resolve?.extensions?.push(".ts", ".tsx", ".js");
  config.module?.rules?.push(buildCssLoader(true));
  config.module?.rules?.map((rule) => {
    if (
      rule &&
      typeof rule === "object" &&
      "test" in rule &&
      rule.test instanceof RegExp &&
      rule.test.toString().includes("svg")
    ) {
      rule.exclude = /\.svg$/i;
    }
  });
  config.module?.rules?.push(buildSvgLoader());

  return config;
};
