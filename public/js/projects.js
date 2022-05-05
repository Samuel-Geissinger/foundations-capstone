const baseURL = `http://localhost:3005/api/projects`;
const confirm = document.querySelector("#confirmation");
const tickets = document.querySelector("#tickets");
const comboBox = document.querySelector(".projects-box");



const getAllTickets = () => {
    axios
    .get(
        `${baseURL}?username=${localStorage.getItem("username")}`,
        localStorage.getItem("username")
    )
    .then((response) => {
        for(let i = comboBox.options.length; i > -1; i--) {
            comboBox.remove(i);
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
//   const div = document.createElement('div');
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
//   div.innerHTML = ticketHTML;

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
                <h2 class="title">${ticket_name}</h2>
                <div class="date">
                    <h4 class="title">${ticket_created}</h4>
                    <h4 class="title">${ticket_due}</h4>
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
                <textarea class="notes" cols="30" rows="10" spellcheck="true">${ticket_notes}</textarea>
            </div>


            <div class="bottom-level">
                <div class="priority-level">
                    <label>Priority Level:</label>
                    <select id="priority-level">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button>Save</button>
            </div>
        </form>`;


        const dialogTag = document.getElementById("dialog");
        dialogTag.innerHTML = dialog; 

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
        response.data.map(
          (comment) =>
            (commentsDiv.innerHTML += `<label>
    <img src="http://placehold.it/" />
    ${comment.comment}
    </label>`)
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
        (checkbox) =>
          (checklistDiv.innerHTML += `
            <label><input type="checkbox" /> ${checkbox.checklist_description}</label>
            
            `)
      );
    })
    .catch((error) => console.log(error));
};


getAllTickets();