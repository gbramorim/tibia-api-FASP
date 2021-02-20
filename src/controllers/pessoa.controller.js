const db = require("../config/database");
const CircularJSON = require('circular-json');
const axios = require("axios");

/* Function to counter the number of objects/worlds */
counterArrayOfObjects = (inputs) => {
  let counter = 0;
  for (let input of inputs) {
    counter += 1;
  }

  return counter;
};

exports.createUser = async (req, res) => {
  const { pessoaid, pessoaemail, pessoapassword } = req.body;

  const response = await db.query(
    "INSERT INTO pessoa (pessoaid, pessoaemail, pessoapassword) VALUES ($1, $2, $3)",
    [pessoaid, pessoaemail, pessoapassword]
  );

  res.status(201).send({
    message: "User added successfully!",
    body: {
      product: { pessoaid, pessoaemail, pessoapassword },
    },
  });
};

exports.listAllUsers = async (req, res) => {
  const response = await db.query("SELECT * FROM pessoa ORDER BY pessoaid ASC");

  res.status(200).send(response.rows);
};

exports.migrateData = async (req, res) => {
  const getDatas = async () => {
    try {
      return await axios.get("https://api.tibiadata.com/v2/worlds.json");
    } catch (error) {
      console.log(error);
    }
  };

  const worldsOfTibia = await getDatas();

  const response = await db.query(
    "INSERT INTO tibiadatas (mundoid, mundonome, mundologados, mundocontinente, mundotipo, mundoadicional) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      worldsOfTibia.data.worlds.allworlds.name,
      worldsOfTibia.data.worlds.online,
      worldsOfTibia.data.worlds.allworlds.location,
      worldsOfTibia.data.worlds.allworlds.worldtype,
      worldsOfTibia.data.worlds.allworlds.additional,
    ]
  );

  res.status(201).send({
    message: "exura",
  });

  res.status(200).send(worldsOfTibia.data.worlds.allworlds);

  // return console.log(counterArrayOfObjects(worldsOfTibia.data.worlds.allworlds));
  // return console.log(counterArrayOfObjects(worldsOfTibia.data.worlds.allworlds));
};

exports.migrateDataChar = async (req, res) => {
  const getChar = async () => {
    //Just for Example, maybe i get this by GET, but at this moment, the URL is offline in TIBIA API Host.
    const worlds = ["Antica", "Premia", "Vunira"];

    try {
      for (let i = 0; i < worlds.length; i++) {
        return await axios.get(
          // `https://api.tibiadata.com/v2/guilds/${worlds[i]}.json`
          `https://api.tibiadata.com/v2/guilds/Antica.json`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Chars = await getChar();

  res.status(200).send(CircularJSON.stringify(Chars));
};
