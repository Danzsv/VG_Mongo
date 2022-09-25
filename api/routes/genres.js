const { Router } = require("express");
const router = Router();

const { getGenres } = require("../utils/getGenres");
const { saveGenreDb, showGenresDb } = require("../controllers/genres");

router.get("/", showGenresDb);

router.post("/dbGenres", getGenres, saveGenreDb);

router.post("/", saveGenreDb);

module.exports = router;
