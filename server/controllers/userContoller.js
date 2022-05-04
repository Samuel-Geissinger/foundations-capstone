require('dotenv').config();
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});


module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    sequelize
      .query(
        `
        SELECT * FROM users
        WHERE user_username = '${username}';
      `
      )
      .then((dbRes) => {
        if(dbRes[0].length > 0) {
          const compare = bcrypt.compareSync(
            password,
            dbRes[0][0].user_password
          );
          compare
            ? res.status(200).send(username)
            : res.status(206).send("invalied Username or password");
        } else {
          res.status(206).send('username or password is incorrect');
        }
        
      })
      .catch((err) => res.status(400).send("invalied Username or password"));
  },

  register: (req, res) => {
    console.log("Registering User");
    const { username, password} = req.body;
    console.log(req.body.username);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = {
      username: username,
      password: passwordHash
    }

    sequelize
      .query(
        `
      INSERT INTO users(user_username, user_password) 
      VALUES ('${newUser.username}', '${newUser.password}');
    `
      )
      .then(() => {
        res.status(200).send(username);
      })
      .catch((err) => res.status(400).send('error creating user'));
  },
};