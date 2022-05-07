const baseURL = `http://localhost:3005/api/projects`;
const confirm = document.querySelector("#confirmation");
const tickets = document.querySelector("#tickets");
const comboBox = document.querySelector(".projects-box");

const saveNewTicket = document.querySelector("#create-new-ticket");
const projectAttach = document.querySelector("#project-attach");
const saveNewProject = document.querySelector("#save-new-project");


let username = 0;
const getAllTickets = () => {
    axios
    .get(
        `${baseURL}?username=${localStorage.getItem("username")}`,
        localStorage.getItem("username")
    )
    .then((response) => {
        for(let i = comboBox.options.length; i > -1; i--) {
            comboBox.remove(i);
            projectAttach.remove(i);
        }

        const all = document.createElement("option");
        all.value = 'all';
        all.text = 'All';
        comboBox.add(all);

        response.data.map((e) => {
        const options = document.createElement("option");
        options.text = e.project_name;
        options.value = `project_id=${e.project_id}`;
        comboBox.add(options);
        
        
        
        const option = document.createElement("option");
        option.text = e.project_name;
        option.value = `project_id=${e.project_id}`;
        projectAttach.add(option);
        });
        response.data.map((e) => getTicket(e));
    })
    .catch((err) => console.log(err));
}

const getProjects = () => {
    const selectedIndex = comboBox.options.selectedIndex;
    const value = comboBox.options[selectedIndex].value;
    tickets.innerHTML = '';
    if (value === 'all') {
        getAllTickets();
    } else {
        const splitValue = value.split('=');
        axios
          .get(
            `${baseURL}/single?username=${localStorage.getItem(
              "username"
            )}&project_id=${splitValue[1]}`
            //localStorage.getItem("username")
          )
          .then((response) => response.data.map((e) => getTicket(e)));
    }
}

const getTicket = (ticket) => {
    axios.post(baseURL, ticket).then((res) => {
      username = res.data[0].user_id;
      res.data.map((e) => (tickets.innerHTML += loadTicket(e)));
    });
}

const loadTicket = (ticket) => {
  const {
    ticket_id,
    ticket_name,
    ticket_due,
    ticket_priority,
    ticket_created,
  } = ticket;
  const ticketHTML = `
            <div class="task-grid" id="${ticket_id}" onclick="openTicket(${ticket_id})">
              <div class="project-bullet">&#8226;</div>
              <div class="project-title">Task Title</div>
              <div class="project-due-date">Due Date</div>
              <div class="project-days-hours-left">Days/Hours Left</div>

              
              <div class="project-title">${ticket_name}</div>
              <div class="project-due-date">${
                ticket_due === null ? "None" : ticket_due
              }</div>

              <div class="project-details">&nbsp;</div>

              <div class="project-priority">
                Priority <span>${ticket_priority}</span>
              </div>

              <div class="project-date-created">
                Date Created <span>${ticket_created}</span>
              </div>
            </div>`;

  return ticketHTML;
};

const openTicket = (ticketId) => {
    
    let dialog = '';
    
    axios
      .get(`http://localhost:3005/api/tickets/${ticketId}`)
      .then((res) => {
        const {
          ticket_id,
          ticket_name,
          ticket_due,
          ticket_priority,
          ticket_created,
          ticket_notes,
        } = res.data[0];
        dialog = `
        <form>
            <div class="top">
                <h2 id="name-${ticket_id}" class="title">${ticket_name}</h2>
                <div class="date">
                    <h4 class="title">Date Created: ${ticket_created}</h4>
                    <h4 id="due-${ticket_id}" class="title">Date Due: ${ticket_due}</h4>
                </div>
            </div>
            <div class="middle">
                <div class="checkbox">
                    <textarea id="checkbox-notes"></textarea>
                </div>

                <div class="comments">
                    <textarea id="comment-notes"></textarea>
                </div>
            </div>

            <div class="notes-container">
                <textarea id="notes-${ticket_id}" class="notes" cols="30" rows="10" spellcheck="true">${ticket_notes}</textarea>
            </div>


            <div class="bottom-level">
                <div class="priority-level">
                    <label>Priority Level:</label>
                    <select id="priority-level-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button id="save-button">Save</button>
            </div>
        </form>`;


        const dialogTag = document.getElementById("dialog");
        dialogTag.innerHTML = dialog; 

        const prioritySelection = document.getElementById("priority-level-select");
        for (let i = 0; i < prioritySelection.length; i++) {
          if (+prioritySelection.options[i].value === ticket_priority) {
            prioritySelection.selectedIndex = i;
            break;
          }
        }

        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', (e) => {
          e.preventDefault();
          saveTicket(ticket_id);
        })

        getComments(ticket_id);
        getCheckboxes(ticket_id);
      })
      .catch((error) => console.log(error));
};


const getComments = (ticketId) => {
    const commentsDiv = document.querySelector(".comments");
    axios
      .get(`http://localhost:3005/api/comments/${ticketId}`)
      .then((response) => {
        response.data.map((comment) =>
          commentsDiv.insertAdjacentHTML(
            "afterbegin",
            `<label>
              <img src="http://placehold.it/" />
              ${comment.comment}
            </label>`
          )
        );
      })
      .catch((error) => console.log(error));
}

const getCheckboxes = (ticketId) => {
  const checklistDiv = document.querySelector(".checkbox");

  axios
    .get(`http://localhost:3005/api/checkbox/${ticketId}`)
    .then((response) => {
      response.data.map(
        (checkbox) => {
          checklistDiv.insertAdjacentHTML("afterbegin", `
            <label><input type="checkbox" id="${checkbox.checklist_id}" class="checklist-boxes" /> ${checkbox.checklist_description}</label>
            `);}    
      );
          const checklist = document.querySelectorAll(".checklist-boxes");
          response.data.map(checkboxes => {
            checklist.forEach((check) => {
              if (check.id === checkboxes.checklist_id && checkboxes.is_completed) {
                check.checked = true;
              }
            });

          })
    })
    .catch((error) => console.log(error));
};

const saveTicket = (ticket_id) => {
  const ticket_name = document.getElementById(`name-${ticket_id}`).innerHTML;
  const ticket_priority = document.getElementById("priority-level-select").value;
  const ticketDue = document.getElementById(`due-${ticket_id}`).innerHTML;
  const ticket_notes = document.getElementById(`notes-${ticket_id}`).value;
  const ticket_due = ticketDue.split(' ')[2];
  console.log(ticket_name, ticket_priority, ticket_due, ticket_notes);

  const updatedTicket = {
    ticketID: ticket_id,
    ticketName: ticket_name,
    ticketDue: ticket_due,
    ticketPriority: +ticket_priority,
    ticketNotes: ticket_notes,
  };
  axios.put(`http://localhost:3005/api/tickets`, updatedTicket).then(res => {
    console.log('updated Ticket successfully', res.data);
  }).catch(err => {console.log(err)});

}

const createTicket = (e) => {
  e.preventDefault();
  const today = new Date();
  const currentDate =
    today.getFullYear() +
    "/" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(today.getDate()).padStart(2, "0");
  
  const name = document.getElementById('new-name').value;
  const notes = document.getElementById('new-notes').value;
  const priority = document.getElementById('new-priority-level-select').value;
  const dueDate = document.getElementById("new-due-date").value.split('-');
  const project = document.getElementById("project-attach").value.split("=")[1];
  const newDuedate = dueDate.join("/");
  
  const newTicket = {
    ticket_name: name,
    ticket_notes: notes,
    ticket_priority: priority,
    ticket_due: newDuedate,
    project_id: project,
    ticket_created: currentDate,
    user_id: username
  };

  axios.post(`http://localhost:3005/api/tickets`, newTicket)
  .then(response => {
    document.getElementById("new-due-date").value = '';
    document.getElementById('new-name').value = '';
    document.getElementById('new-notes').value = '';
    document.getElementById('new-priority-level-select').value = 1;
    console.log(response.data);
  }).catch(err => {console.log(err);});
}


const createProject = (e) => {
  e.preventDefault();
  const projectName = document.getElementById('create-project-input').value;
  const newProject = {
    project_name: projectName,
    user_id: username
  };

  axios.post(`http://localhost:3005/api/createproject`, newProject)
  .then(response => {
    console.log(response.data);
  });
  
}


saveNewProject.addEventListener('click', createProject);
saveNewTicket.addEventListener("click", createTicket);

getAllTickets();