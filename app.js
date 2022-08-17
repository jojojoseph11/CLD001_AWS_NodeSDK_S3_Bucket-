const app = require('express')();
const routes = require('./src/routes');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routes);


app.listen(PORT, () => {
    console.log('I am listening');
})