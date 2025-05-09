import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import { BuildPaths } from "./types/config";

export function buildPlugins(html: string): webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: html,
    }),
    new webpack.ProgressPlugin(),
  ];
}
