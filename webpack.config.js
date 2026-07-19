module.exports = async function (env, argv) {
  const createExpoWebpackConfigAsync = require('@expo/webpack-config');
  const config = await createExpoWebpackConfigAsync(env, argv);
  return config;
};
