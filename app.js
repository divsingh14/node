const express = require("express");
const bodyParser = require("body-parser");

const leadRoutes = require("./src/routes/lead");
const eventRoutes = require("./src/routes/event");
const leadSource = require("./src/routes/leadSource");
const user = require("./src/routes/user");
const auth = require("./src/routes/auth");

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/lead_source", leadSource);
app.use("/api/v1/user", user);
app.use("/api/v1/auth", auth);

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
