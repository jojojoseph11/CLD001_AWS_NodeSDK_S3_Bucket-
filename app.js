const app = require('express')();
const routes = require('./src/routes');

// Simple express middleware for uploading files . https://www.npmjs.com/package/express-fileupload
const fileUpload = require('express-fileupload');
// Node.js body parsing middleware. https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);


app.listen(PORT, () => {
    console.log('I am listening');
})