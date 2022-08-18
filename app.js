const app = require('express')();
const routes = require('./src/routes');
require('dotenv').config();   //.env


const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

// Simple express middleware for uploading files . https://www.npmjs.com/package/express-fileupload
const fileUpload = require('express-fileupload');
// Node.js body parsing middleware. https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})