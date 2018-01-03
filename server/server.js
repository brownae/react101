const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; //The port location provided by Heroku. if not found then use port 3000.

app.use(express.static(publicPath));

//req = request res=response
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port,() => {
    console.log('Express server is up.');
});
