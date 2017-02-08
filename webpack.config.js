module.exports = {
  entry: {
    b: "./web/static/admin/js/admin.js"
  },
  output: {
    path: "./priv/static/js",
    filename: "admin.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
	loader: 'babel',
	exclude: /node_modules/,
	query: {
	  presets: ['es2015','react','es2016']
	}
      },
      {
	test: /(\.scss|\.css)$/,
	loader: 'style!css?modules'
      }
    ]
  },
  resolve: {
    modulesDirectory: ["node_modules", __dirname + "/web/static/admin/js"]
  } 
}
