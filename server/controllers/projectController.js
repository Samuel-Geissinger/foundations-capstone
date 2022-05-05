require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getProjects: (req, res) => {
    const username = req.query.username;
    sequelize
      .query(
        `
            SELECT p.project_name, p.project_id FROM user_project AS up
            JOIN users AS u ON up.user_id = u.user_id
            JOIN projects AS p ON up.project_id = p.project_id
            WHERE u.user_username = '${username}';`
      )
      .then((dbResult) => {
        res.status(200).send(dbResult[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error getting results");
      });
  },

  getTicket: (req, res) => {
    const { project_id } = req.body;
    sequelize
      .query(
        `
            SELECT * FROM tickets
            WHERE project_id = ${project_id};
        `
      )
      .then((dbResult) => {
        res.status(200).send(dbResult[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error getting results");
      });
  },

  getProject: (req, res) => {
    const username = req.query.username;
    const project_id = req.query.project_id;
    sequelize
      .query(
        `
            SELECT p.project_name, p.project_id FROM user_project AS up
            JOIN users AS u ON up.user_id = u.user_id
            JOIN projects AS p ON up.project_id = p.project_id
            WHERE u.user_username = '${username}' AND p.project_id = '${project_id}';
      `
      )
      .then((dbResult) => res.status(200).send(dbResult[0]));
  },

  editTicket: (req, res) => {
    const {
      ticketName,
      ticketNotes,
      ticketPriority,
      ticketCompletedNotes,
      ticketCompleted,
      ticketID,
    } = req.body;

    sequelize.query(`
        UPDATE tickets
        SET ticket_name = '${ticketName}',
          ticket_due = date,
          ticket_done = date,
          ticket_notes = '${ticketNotes}',
          ticket_priority = ${ticketPriority},
          ticket_completed_notes = '${ticketCompletedNotes}',
          ticket_completed = ${ticketCompleted},
        WHERE ticket_id = ${ticketID};
      
      `);
  },

  deleteTicket: (req, res) => {
    const { ticketID } = req.body;
    sequelize.query(`DELETE FROM tickets WHERE ticket_id = ${ticketID};`);
  },

  deleteProject: (req, res) => {
    const { projectID } = req.body;
    sequelize.query(`DELETE FROM projects WHERE project_id = ${projectID};`);
  },

  editProject: (req, res) => {
    const { projectID, projectName, isCompleted } = req.body;
    sequelize.query(`
          UPDATE projects
          SET project_name = '${projectName}',
          is_completed = '${isCompleted}'
          WHERE project_id = ${projectID};
        `);
  },

  getSingleTicket: (req, res) => {
    const ticketId = +req.params.id;
    sequelize
      .query(
        `
        SELECT * FROM tickets
        WHERE ticket_id = ${ticketId};
      `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getComments: (req, res) => {
    const ticketId = +req.params.id;
    sequelize
      .query(
        `
      SELECT * FROM comments
      WHERE ticket_id = ${ticketId};
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getChecklist: (req, res) => {
    const ticketId = +req.params.id;
    sequelize
      .query(
        `
      SELECT * FROM checklist
      WHERE ticket_id = ${ticketId};
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  }
};