const express = require("express");
const cors = require("cors");
const addUser = require("./util/addUser");
const getIp = require("./util/ip");

const app = express();
const port =
  process.env.ENVIRONMENT === "DEVELOPMENT" ? 3000 : process.env.PORT;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working-home");
});
app.get("/test", (req, res) => res.send("Working-test"));

app.get("/api/insta_load/:id/:date", async (req, res) => {
  const ip = getIp(req);
  try {
    let id = req.params.id;
    let date = req.params.date;

    addUser({ id, date, ip, isOnload: true });
    res.send("2000");
  } catch (e) {
    console.log(e);
    await addError(e, userIP);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});
app.get("/api/insta_name_give/:name/:id/:date", async (req, res) => {
  const ip = getIp(req);
  try {
    let name = req.params.name;
    let id = req.params.id;
    let date = req.params.date;
    await addUser({ id, date, ip, name });
    res.send("8000");
  } catch (e) {
    console.log(e);
    await addError(e, userIP);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
