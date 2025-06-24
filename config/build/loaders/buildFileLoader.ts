export function buildFileLoader() {
  return {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };
}
