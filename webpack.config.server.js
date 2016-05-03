var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var srcPath = path.join(__dirname,'./src')
var nodeModules = fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });

module.exports = {
	entry: path.join(__dirname, './src/server.js'),
	resolve : {
		extensions: ['','.js','.jsx'],
		modulesDirectories: ["src", "node_modules"]
	},
    module: {
	    preLoaders: [
	      {
	        test: /\.(js|jsx)$/,
	        include: __dirname,
	        loader: 'eslint-loader',

	      }
	    ],
	    loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				query: {
      				"presets": ["es2015","react"]
    			},
				include: path.join(__dirname, './src'),
    			exclude: path.join(__dirname, './node_modules')
			},
			{
				test: /\.json$/, 
				loader: "json-loader",
			}
	    ]
	},
	node: {
    __filename: true,
    __dirname: true
  	},
	externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, "commonjs " + request);
      };
      callback();
    }
  	],
	target: 'node',
	devtool : 'sourcemap',
	plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  	],
	output: {
        path: path.join(__dirname, './static'),
    	filename: 'bundleserver.js',
    },
}

//example http://jlongster.com/Backend-Apps-with-Webpack--Part-I
//https://github.com/jlongster/backend-with-webpack