const { videoGameModel, genreModel } = require("../models");

const getVideogamesDb = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await videoGameModel.find({}).populate("genres");

    if (name) {
      let videoGameName = result.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (videoGameName.length === 0) {
        res.send({ msg: "No existe el videogame" });
      } else {
        res.send(videoGameName);
      }
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error.message);
  }
};
// const showGenresDb = async (req, res) => {
//     const result = await genreModel.find({});
//     res.send(result);
//   };

const saveVideogameDb = async (req, res) => {
  try {
    const apiVideogames = req.body;
    console.log(apiVideogames);
    const result = await videoGameModel.create(apiVideogames);
    console.log(result);
    res.send(result);
    // res.send({ msg: "uwu" });
  } catch (error) {
    console.log(error.message);
  }
};

const getVideogameById = async (req, res) => {
  const { id } = req.params;

  const result = await videoGameModel.findById(id).populate("genres");

  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ msg: "error not found" });
  }
};

module.exports = { saveVideogameDb, getVideogamesDb, getVideogameById };
