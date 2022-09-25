require("dotenv").config();
const axios = require("axios");

const { API_KEY } = process.env;
const getGenres = async (req, res, next) => {
  try {
    const genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const allGenres = genres.data.results.map((element) => ({
      name: element.name,
    }));

    req.body = allGenres;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getGenres };
