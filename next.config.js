module.exports = {
  webpack: (config) => {
    config.node = {
      //fs: 'empty'
      global: true,
  __filename: true,
  __dirname: true,
    }
    return config
  }
};
