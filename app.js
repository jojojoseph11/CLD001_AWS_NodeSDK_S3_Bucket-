const app = require('express')();
const routes = require('./src/routes');
require('dotenv').config();   //.env
const fileUpload = require('express-fileupload'); // Simple express middleware for uploading files . https://www.npmjs.com/package/express-fileupload

const bodyParser = require('body-parser'); // Node.js body parsing middleware. https://www.npmjs.com/package/body-parser


const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})