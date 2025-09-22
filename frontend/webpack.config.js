const path = require('path');

module.exports = {
  mode: 'development', // or 'production' or 'none'
  entry: './src/index.js', // Your main entry point
  output: {
    path: path.resolve(__dirname, 'public'), // Output directory
    filename: 'app.js', // Output filename to match HTML
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'https://github-streaks-txx3.onrender.com',
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Add presets here as well
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};