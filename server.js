const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const  fs = require('fs') 
const swaggerUi = require('swagger-ui-express') 

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
