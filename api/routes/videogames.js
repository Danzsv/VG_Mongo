const express = require("express");

const router = express.Router();
const { getVideogameApi } = require("../utils/getVideogames");
const {
  saveVideogameDb,
  getVideogamesDb,
  getVideogameById,
} = require("../controllers/videogames");

router.post("/", saveVideogameDb);

router.post("/apiVideogames", getVideogameApi, saveVideogameDb);

router.get("/", getVideogamesDb);

router.get("/:id", getVideogameById);

module.exports = router;
