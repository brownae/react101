const path = require('path');//this gives us access to the node .join() function.
// must give ENTRY point and OUTPUT

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
};