const express = require("express");
const allRoutes = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

allRoutes.use(authRoutes);
allRoutes.use(userRoutes);

module.exports = allRoutes;