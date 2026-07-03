const express = require("express");
const allRoutes = express.Router();

allRoutes.use("/auth", (req, res) => {
    res.send("Auth route is working");
});

module.exports = allRoutes;