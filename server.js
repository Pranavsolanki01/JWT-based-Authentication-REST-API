const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

app.use("/api/contacts", require("./routes/contactRoutes")); // for the contact
app.use("/api/users", require("./routes/userRoutes")); // for the user

app.use(errorHandler);

// app.get("/api/contact", );
