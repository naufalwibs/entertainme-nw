const express = require("express");
const router = express.Router();
const MovieRoute = require("./movieRoute");

router.use(MovieRoute);

module.exports = router;
