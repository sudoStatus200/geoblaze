const path = require('path');

module.exports = (env, argv) => {

  const {mode, target} = argv;

  const filename = `geoblaze.${target}${mode === 'production' ? '.min' : ''}.js`;

  const results = {
    mode,
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
      library: 'geoblaze',
      path: path.resolve(__dirname, 'dist'),
      filename,
      globalObject: `(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : typeof this !== 'undefined' ? this : undefined)`,
      libraryTarget: 'umd',
      umdNamedDefine: true  
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.json'],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          include: /src/,
        },
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: modulePath => (
            /node_modules/.test(modulePath) &&
            !/node_modules\/webpack-dev-server/.test(modulePath) &&
            !/node_modules\/map-obj/.test(modulePath)
          ),
        }
      ],
    },
    stats: {
      colors: true,
      chunks: true,
    },
    plugins: [
    ],
    externals: {
      'fs': 'fs',
      'node-fetch': 'node-fetch'
    }
  };

  if (mode === "development") {
    results.devServer = {
      publicPath: '/',
      historyApiFallback: true,
    };
  }

  return results;
};
