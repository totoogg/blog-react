import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildSvgLoader } from "./loaders/buildSvhLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader();

  const babelLoader = buildBabelLoader(options.isDev);

  const fileLoader = buildFileLoader();

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const cssLoader = buildCssLoader(options.isDev);

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
