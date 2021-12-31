require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

require("./db/connect")();

app.use("/api/auth", require("./routes/users/auth"));
app.use("/api/users", require("./routes/users/users"));
app.use("/api/music", require("./routes/music"));

app.use(require("./js/error/errorHandler"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
