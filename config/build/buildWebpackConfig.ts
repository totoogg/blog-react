import webpack from "webpack";
import { BuildOptions } from "./types/config";
import path from "path";
import { buildLoaders } from "./buildLoaders";
import { buildResolves } from "./buildResolves";
import { buildPlugins } from "./buildPlugins";

export default function buildWebpackConfig(
  option: BuildOptions
): webpack.Configuration {
  const {
    mode,
    paths: { entry, build, html },
  } = option;

  return {
    mode,
    entry,
    output: {
      filename: "[name].[contenthash].js",
      path: build,
      clean: true,
    },
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolves(),
    plugins: buildPlugins(html),
  };
}
