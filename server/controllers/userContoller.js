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
            ? res.status(200).send(dbRes[0][0])
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
      VALUES ('${newUser.username}', '${newUser.password}')
      RETURNING user_id, user_username
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0][0]);
      })
      .catch((err) => res.status(400).send('error creating user'));
  },

  getID: (req, res) => {
    const username = req.params.username
    console.log(req.params.username);
    sequelize.query(`
      SELECT user_id FROM users 
      WHERE user_username = '${username}';
    `)
    .then((dbRes) => {res.status(200).send(dbRes[0])})
    .catch((err) => res.status(400).send('error getting user ID'));
  },

  updateUser: (req, res) => {
    const { user_username, user_id, user_password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(user_password, salt);
    sequelize.query(`
      SELECT user_id FROM users
      WHERE '${user_username}' = user_username;
    `).then(dbResult => {
      if (dbResult[0].length === 0) {
        sequelize.query(`
          UPDATE users SET
          user_username = '${user_username}',
          user_password = '${passwordHash}'
          WHERE user_id = '${user_id}';
        `)
        .then(dbRes => res.status(200).send('updated the user'))
        .catch(err => console.log(err));
      } else {
        res.status(200).send('Username is already in use');
      }
    }).catch(err => console.log(err));
  },

  deleteUser: (req, res) => {
    const username = req.params.username;
    sequelize.query(`
      DELETE FROM users
      WHERE user_username = '${username}'
    `)
    .then(dbRes => res.status(200).send('Deleted user'))
    .catch(err => console.log(err));
  }
};