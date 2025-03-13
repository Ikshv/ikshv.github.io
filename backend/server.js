const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("simple api")
});

app.get("/api", (req, res) => {
    res.json({message: "hello from API", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});