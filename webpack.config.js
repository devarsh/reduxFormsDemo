var path = require('path')
var port = 8000
var webpack = require('webpack')
var srcPath = path.join(__dirname,'./src')
module.exports = {
	context : __dirname,
	entry: [
	'babel-polyfill',
	'webpack-dev-server/client?http://127.0.0.1:' + 8000,
    'webpack/hot/only-dev-server',
	'./src/index'],
	resolve: {
    	extensions: ['','.js','.jsx'],
    	alias : {
    		actions:    `${ srcPath }/actions/`,
      		components: `${ srcPath }/components/`,
     		consts :    `${ srcPath }/consts/`,
      		reducer: 	`${ srcPath }/reducer/`,
      	},
      	modulesDirectories: ["src", "node_modules"]
    },
    module: {
	    preLoaders: [
	      {
	        test: /\.(js|jsx)$/,
	        include: __dirname,
	        loader: 'eslint-loader'
	      }
	    ],
	    loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.sass/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded&indentedSyntax'
			},
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded'
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test: /\.styl/,
				loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|ico|eot|svg|ttf|woff|woff2|jpeg)$/,
				loader: 'url-loader?limit=8192&name=img/img-[hash:6].[ext]'
			},
			{
				test: /\.(htm|html)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(js|jsx)$/,
  				loader: 'react-hot!babel-loader',
    			include: path.join(__dirname, './src'),
    			exclude: path.join(__dirname, './node_modules')
			}
	    ]
	},
	plugins: [
    	new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
    	/*new webpack.DefinePlugin({
      		'process.env': {
        		'NODE_ENV': JSON.stringify('development')
      		}
    	}),
    	new webpack.optimize.UglifyJsPlugin({
      		compressor: {
        		warnings: false
      		}
    	})*/
    	
  	],
	cache: true,
	target: 'web',
	devtool : 'eval-source-map',
	output: {
        path: path.join(__dirname, './static'),
    	filename: 'bundle.js',
    	publicPath:'/assets/'
    },
    devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    port: 8000,
    https:false,
    publicPath: '/assets/',
    noInfo: false,
    stats : { color:true},
    quite: false
  },
}