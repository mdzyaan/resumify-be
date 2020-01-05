const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
var cors = require("cors");
require('dotenv').config();

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", 'https://resumify-fe.herokuapp.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// DB Config
const dbUri = process.env.MONGO_URI;
// Connect to MongoDB
mongoose
  .connect(dbUri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api", users);



const port = process.env.PORT || 8080; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
