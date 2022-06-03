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
    const { ticketName, ticketNotes, ticketPriority, ticketID, ticketDue } =
      req.body;
    sequelize
      .query(
        `
        UPDATE tickets
        SET ticket_name = '${ticketName}',
          ticket_due = '${ticketDue}',
          ticket_notes = '${ticketNotes}',
          ticket_priority = ${ticketPriority}
        WHERE ticket_id = ${ticketID};
      
      `
      )
      .then((dbRes) => {
        res.status(200).send("Added");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteTicket: (req, res) => {
    const ticketID = req.params.id;
    sequelize.query(`
      DELETE FROM tickets 
      WHERE ticket_id = ${ticketID};`
    ).then(dbRes => {res.status(200).send('Deleted Ticket')});
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
  },
  addTicket: (req, res) => {
    const {
      ticket_name,
      ticket_notes,
      ticket_priority,
      ticket_due,
      project_id,
      ticket_created,
      user_id,
    } = req.body;

    sequelize
      .query(
        `
      INSERT INTO tickets
      (project_id, 
      user_id, 
      ticket_name, 
      ticket_created, 
      ticket_priority, 
      ticket_completed,
      ticket_notes,
      ticket_due)
      VALUES
        (${project_id}, ${user_id}, '${ticket_name}', '${ticket_created}', ${ticket_priority}, FALSE, '${ticket_notes}', '${ticket_due}')
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0])).catch((err) => console.log(err));

  },

  createProject: (req, res) => {
    const { project_name, user_id } = req.body;

    sequelize.query(`
        WITH new_project AS (
          INSERT INTO projects (project_name, is_completed)
          VALUES ('${project_name}', FALSE)
          RETURNING project_id
        )
        INSERT INTO user_project (user_id, project_id)
        SELECT ${user_id}, project_id
        FROM new_project;
    `)
    .then((dbRes) => res.status(200).send(dbRes))
    .catch((err) => console.log(err));
  }
};