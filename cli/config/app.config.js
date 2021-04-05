const path = require('path')
module.exports = {
     
   
    pluginOptions: {
        entry: undefined,
        output: {
            path: path.resolve(__dirname, 'dist'),
            name: '[name].js'
        }
    }
}