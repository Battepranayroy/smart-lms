const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = function override(config, env) {
  if (process.env.ANALYZE) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
      })
    );
  }
  return config;
};