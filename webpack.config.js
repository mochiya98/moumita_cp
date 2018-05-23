const path = require("path");
//const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	let exp = {
		mode  : "development",
		entry : "./src/main.js",
		output: {
			path      : path.resolve(__dirname, "./dist"),
			//publicPath: "/dist/",
			filename: "build.js",
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use : [
						"vue-style-loader",
						{
							loader : "css-loader",
							options: {
								url: false,
							},
						},
					],
				},
				{
					test: /\.scss/, // 対象となるファイルの拡張子
					use : [
					// linkタグに出力する機能
						"vue-style-loader",
						// CSSをバンドルするための機能
						{
							loader : "css-loader",
							options: {
								//modules: true,
								// オプションでCSS内のurl()メソッドの取り込みを禁止する
								url: false,
								// ソースマップの利用有無
 
								// 0 => no loaders (default);
								// 1 => postcss-loader;
								// 2 => postcss-loader, sass-loader
								//importLoaders: 2,
							},
						},
						{
							loader : "sass-loader",
							options: {
							// ソースマップの利用有無
							},
						},
					],
				},
				{
					test   : /\.vue$/,
					loader : "vue-loader",
					options: {
						loaders: {
							scss: "vue-style-loader!css-loader!sass-loader", // <style lang="scss">
							sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax", // <style lang="sass">
						},
					// other vue-loader options go here
					},
				},
				{
					test   : /\.js$/,
					loader : "babel-loader",
					exclude: /node_modules/,
				},
				{
					test   : /\.(png|woff|woff2|eof|ttf|otf|jpg|gif|svg)$/,
					loader : "file-loader",
					options: {
						name: "[name].[ext]?[hash]",
					},
				},
			],
		},
		resolve: {
			alias: {
				"vue$": "vue/dist/vue.esm.js",
			},
			extensions: [".js", ".vue", ".less"],
			modules   : [
				path.resolve("./node_modules"),
				path.resolve("./src"),
			],
		},
		/*resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },*/
		devServer: {
			historyApiFallback: true,
			contentBase       : "dist",
			//publicPath        : "/dist/",
			port              : 3000,
			//noInfo: true,
			overlay           : true,
			//hot               : true,
		},
		performance: {
			hints: "warning",
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				filename: "index.html",
				minify  : {
					removeScriptTypeAttributes: true,
				},
				title: "moumita_cp",
			}),
		],
	//devtool: '#eval-source-map'
	};
	console.log("MODE:" + argv.mode);
	if(argv.mode !== "production"){
		exp.devtool = "#source-map";
		console.log(exp.module.rules);
		exp
			.module
			.rules
			.find(c=>!!c.test.toString()
				.match(/s[ac]ss/))
			.use
			.map(c=>{
				if(typeof c === "string")return c;
				if(!c.options)c.options = {};
				c.options.sourceMap = true;
				return c;
			});
	}
	return exp;
};
