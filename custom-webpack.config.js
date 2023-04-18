const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                Environment: JSON.stringify(process.env.Environment),
                ApiUrl: JSON.stringify(process.env.ApiUrl)
            }
        })
    ]
};
