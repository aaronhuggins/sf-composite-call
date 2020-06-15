module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist/web'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  },
  target: 'web',
  optimization: {
    minimize: true
  }
}
