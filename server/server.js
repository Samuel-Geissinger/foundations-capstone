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
} = require("./controllers/userContoller");

const {
  getProjects,
  getTicket,
  getProject,
} = require("./controllers/projectController");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/projects.html'));
})

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, "../node_modules")));


app.put(`/api/user/auth`, register);
app.post(`/api/user/auth`, login);

app.get(`/api/projects/single`, getProject);
app.get(`/api/projects`, getProjects);
app.post(`/api/projects`, getTicket);

const port = process.env.SERVER_PORT || 4050;
app.listen(port, () => console.log(`listening on port: ${port}`));