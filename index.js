require("dotenv").config();
const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./config/mongoDb");
const { checkForAuthentication } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

// routes.
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const restaurantRoute = require("./routes/restaurant");

const app = express();
const PORT = process.env.PORT || 3000;
connectMongoDb(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/api/restaurant", restaurantRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
