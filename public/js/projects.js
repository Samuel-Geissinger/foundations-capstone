const baseURL = `http://localhost:3005/api/projects`;
const confirm = document.querySelector("#confirmation");
const tickets = document.querySelector("#tickets");
const comboBox = document.querySelector(".projects-box");

const saveNewTicket = document.querySelector("#create-new-ticket");
const projectAttach = document.querySelector("#project-attach");
const saveNewProject = document.querySelector("#save-new-project");


const userID = sessionStorage.getItem("user_id");
const username = sessionStorage.getItem("username");

const addProjectBtn = document.querySelector("#add-project");
const addTicketBtn = document.querySelector("#add-ticket");

const projectDialog = document.querySelector("#create-project");
const ticketDialog = document.querySelector("#create-ticket");
const editTicketDialog = document.querySelector("#dialog");


if (!username) {
  window.location.href = "/";
}

const getAllTickets = () => {
    tickets.innerHTML = '';
    axios
    .get(
        `${baseURL}?username=${username}`, username)
    .then((response) => {
        comboBox.options.length = 0;
        projectAttach.options.length = 0;
      
        // for(let i = comboBox.options.length; i > -1; i--) {
        //     comboBox.remove(i);
        //     projectAttach.remove(i);
        // }

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
            `${baseURL}/single?username=${username}&project_id=${splitValue[1]}`
            //localStorage.getItem("username")
          )
          .then((response) => response.data.map((e) => getTicket(e)));
    }
}

const getTicket = (ticket) => {
    axios.post(baseURL, ticket).then((res) => {
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
              <div class="project-title">Task Title:</div>
              <div class="project-due-date">Due Date:</div>
              <div class="project-date-create">Date Created:</div>

              
              <div class="project-title">${ticket_name}</div>
              <div class="project-due-date">${ticket_due === null ? "None" : ticket_due}</div>
              <div class="project-date-create">${ticket_created}</div>


              <div class="project-priority">
                Priority: <span>${ticket_priority}</span>
              </div>


              <button class="ticket-delete-button" data-id="${ticket_id}" onclick="deleteTicket(${ticket_id}, this, event)">Delete</button>
            </div>`;

  return ticketHTML;
};

const openTicket = (ticketId, e) => {
    console.log(e);
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
        <div class="header-text">Edit Ticket</div>
        <form>
            <div class="top">
                <h4 id="name-${ticket_id}" class="title-name" onclick="editTicketName(${ticket_id}, '${ticket_name}')">${ticket_name}</h4>
            </div>
            <div class="date">
                <label class="title">Date Created: ${ticket_created}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label class="title">Date Due: <input id="due-${ticket_id}" type="date" value="${ticket_due}"/></label>
            </div>

            <div class="notes-container">
                <fieldset>
                    <legend style="text-align: center;">Notes</legend>
                    <textarea id="notes-${ticket_id}" class="notes" style="width: 100%" rows="10" spellcheck="true">${ticket_notes}</textarea>
                </fieldset>
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
                <button id="close-ticket">Close</button>
            </div>
        </form>`;


        editTicketDialog.innerHTML = dialog; 
        editTicketDialog.show();
        const prioritySelection = document.getElementById("priority-level-select");
        for (let i = 0; i < prioritySelection.length; i++) {
          if (+prioritySelection.options[i].value === ticket_priority) {
            prioritySelection.selectedIndex = i;
            break;
          }
        }

        document.getElementById('close-ticket').addEventListener('click', (e) => {
          e.preventDefault();
          editTicketDialog.close();
        })

        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', (e) => {
          e.preventDefault();
          editTicketDialog.close();
          saveTicket(ticket_id);
          getAllTickets();
        })

      })
      .catch((error) => console.log(error));
};

const editTicketName = (ticket_id, ticket_name) => {
  const dialog = `
      <input id="new-ticket-name" type="text" placeholder="${ticket_name}" />
      <button id="save-ticket-name" >Save</button>
      <button id="close-ticket-name" >Close</button>
  `;
  const newNameDialog = document.getElementById(`new-name-dialog`);
  newNameDialog.innerHTML = dialog;
  newNameDialog.show();

  const saveTicketName = document.querySelector('#save-ticket-name');

  saveTicketName.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(`#name-${ticket_id}`).innerHTML = document.querySelector(`#new-ticket-name`).value; 
    newNameDialog.close();
  });

  document.getElementById('close-ticket-name').addEventListener('click', (e) => {
    e.preventDefault();
    newNameDialog.close();
  });
}


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
  const ticketDue = document.getElementById(`due-${ticket_id}`).value.split('-');
  const ticket_notes = document.getElementById(`notes-${ticket_id}`).value;
  const ticket_due = ticketDue.join("/");

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
    user_id: userID
  };

  axios.post(`http://localhost:3005/api/tickets`, newTicket)
  .then(response => {
    document.getElementById("new-due-date").value = '';
    document.getElementById('new-name').value = '';
    document.getElementById('new-notes').value = '';
    document.getElementById('new-priority-level-select').value = 1;
    ticketDialog.close();
    getAllTickets();
  }).catch(err => {console.log(err);});
}


const createProject = (e) => {
  e.preventDefault();
  const projectName = document.getElementById('create-project-input').value;
  const newProject = {
    project_name: projectName,
    user_id: userID
  };

  axios.post(`http://localhost:3005/api/createproject`, newProject)
  .then(response => {
    projectDialog.close();
    document.getElementById('create-project-input').value = '';
    getAllTickets();
  });
}

const deleteTicket = (ticket_id, el, event) => {
  console.log(event);
  event.preventDefault();
  if(confirm('Are you sure you want to delete?')) {
    axios.delete(`/api/tickets/${ticket_id}`)
    .then(res => {
      console.log(res.data);

      getAllTickets();
    })
    .catch(err => { console.error(err) });
  }
} 


addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  projectDialog.show();
});

addTicketBtn.addEventListener('click', (e) => {
  e.preventDefault();
  ticketDialog.show();
});

document.getElementById('close-new-project').addEventListener('click', (e) => {
  e.preventDefault();
  projectDialog.close();
});

document.getElementById('close-new-ticket').addEventListener('click', (e) => {
  e.preventDefault();
  ticketDialog.close();
});

document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = "/";
});



saveNewProject.addEventListener('click', createProject);
saveNewTicket.addEventListener("click", createTicket);

getAllTickets();