import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildLoaders } from "./buildLoaders";
import { buildResolves } from "./buildResolves";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";

export default function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const {
    mode,
    paths: { entry, build, html },
    isDev,
  } = options;

  return {
    mode,
    entry,
    output: {
      filename: "[name].[contenthash].js",
      path: build,
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolves(),
    plugins: buildPlugins(html),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
