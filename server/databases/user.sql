-- Get the user based on their username
SELECT * FROM users
WHERE user_username = 'User Name';

-- Get the projects from the users based on username
SELECT * FROM user_project
JOIN users ON user_project.user_id = users.user_id
JOIN projects ON user_project.project_id = projects.project_id
WHERE users.user_username = 'User Name';

-- Get the comments for a ticket based on ticket ID
SELECT * FROM comments
JOIN users ON users.user_id = comments.user_id
WHERE ticket_id = ticket_id_value;


-- Get the checklist based on ticket ID 
SELECT * FROM checklist
WHERE ticket_id = ticket_id_value;


-- Get all the values for a ticket based on project ID
SELECT * FROM tickets
WHERE project_id = project_id_value;

-- Update the users information 
UPDATE users
SET user_username = 'user_name4', user_password = 'password4'
WHERE user_id = 2;


-- update the tickets 
UPDATE tickets
SET ticket_name = 'name',
	ticket_due = date,
	ticket_done = date,
	ticket_notes = 'Notes',
	ticket_priority = 4,
	ticket_completed_notes = 'Completed Notes',
	ticket_completed = TRUE,
WHERE ticket_id = 3;



