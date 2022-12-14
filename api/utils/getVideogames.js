require("dotenv").config();
const axios = require("axios");
const { videoGameModel, genreModel } = require("../models/index");
const { API_KEY } = process.env;

const getVideogameApi = async (req, res, next) => {
  const genres = await genreModel.find({});

  const getGames = [];
  let numeroPagina = 1;
  while (numeroPagina <= 6) {
    let api = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${numeroPagina}`
    );
    api.data.results.map(async (e) => {
      let buscarId = await axios.get(
        `https://api.rawg.io/api/games/${e.id}?key=${API_KEY}`
      );
      let descriptionGame = buscarId.data.description_raw;
      const genresEach = e.genres.map((e) => e.name);
      let arrayGenres = [];
      for (let i = 0; i < genresEach.length; i++) {
        const uwu = genres.filter((e) => e.name === genresEach[i]);
        arrayGenres.push(uwu);
      }
      const uwu2 = arrayGenres.flat();
      const uwu3 = uwu2.map((e) => e._id);
      console.log(uwu3);
      //   console.log(uwu2);
      //   const filter = genres.map((e) => e.name === genresEach[0]);
      getGames.push({
        videogameId: e.id,
        name: e.name,
        image: e.background_image,
        genres: uwu3,
        description: descriptionGame,
        // .join().split(","),
        released: e.released,
        rating: e.rating,
        platforms: e.platforms
          .map((e) => e.platform.name)
          .join()
          .split(","),
      });
    });
    numeroPagina++;
  }
  req.body = getGames;
  next();
};

module.exports = { getVideogameApi };
