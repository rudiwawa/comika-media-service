const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

const response = require("./src/helpers/response");
app.get("/", (req, res) => res.json("WELCOME TO COMIKA MEDIA SERVICE"));
app.use("/", require("./src/routes/authRoute"));
app.use("/users", require("./src/routes/userRoute"));
app.use("/article", require("./src/routes/articleRoute"));
app.use(response);

const { sequelize } = require("./src/models");
sequelize.sync({ force: true });
// sequelize.sync();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
