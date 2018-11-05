var path = require("path"); 

var DIST_DIR = path.join(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                loader: "babel-loader"
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        inline:true,
        port:8081
    },
    mode:"development"
};

module.exports = config;
