require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const {
  login,
  register,
  getID,
  updateUser,
  deleteUser
} = require("./controllers/userContoller");

const {
  getProjects,
  getTicket,
  getProject,
  getSingleTicket,
  getComments,
  getChecklist,
  editTicket,
  addTicket,
  createProject,
  deleteTicket
} = require("./controllers/projectController");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/projects.html'));
})

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/profile.html'));
})

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, "../node_modules")));


app.put(`/api/user/auth`, register);
app.post(`/api/user/auth`, login);

app.put(`/api/users/`, updateUser);
app.get(`/api/users/`, getID);
app.delete(`/api/users/`, deleteUser);



app.get(`/api/projects/single`, getProject);
app.get(`/api/projects`, getProjects);
app.post(`/api/projects`, getTicket);
app.post(`/api/createproject`, createProject);


app.delete(`/api/tickets/:id`, deleteTicket);
app.get(`/api/tickets/:id`, getSingleTicket);
app.get(`/api/comments/:id`, getComments);
app.get(`/api/checkbox/:id`, getChecklist);
app.put(`/api/tickets`, editTicket);
app.post(`/api/tickets`, addTicket);

const port = process.env.SERVER_PORT || 4050;
app.listen(port, () => console.log(`listening on port: ${port}`));
