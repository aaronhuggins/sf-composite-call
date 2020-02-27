const DtsBundleWebpack = require('dts-bundle-webpack')
const pkg = require('./package.json')

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    libraryTarget: 'commonjs',
    filename: 'index.js',
    path: __dirname
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  target: 'node',
  optimization: {
    minimize: false
  },
  plugins: [
    new DtsBundleWebpack({
      name: pkg.name,
      baseDir: './',
      main: 'dist/index.d.ts',
      out: 'index.d.ts'
    })
  ]
}
