CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_username, VARCHAR(80) NOT NULL,
  user_password VARCHAR(144) NOT NULL
);

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(80) NOT NULL,  
  is_completed BOOL NOT NULL
);


CREATE TABLE user_project (
  user_project_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  project_id INTEGER REFERENCES projects(project_id) NOT NULL
);


CREATE TABLE tickets (
  ticket_id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(project_id) NOT NULL,
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  ticket_name VARCHAR(80) NOT NULL,
  ticket_created DATE NOT NULL,
  ticket_due DATE,
  ticket_done DATE,
  ticket_notes TEXT,
  ticket_priority INTEGER NOT NULL,
  ticket_completed_notes VARCHAR,
  ticket_completed BOOL NOT NULL
);


CREATE TABLE checklist (
  checklist_id SERIAL PRIMARY KEY,
  ticket_id INTEGER REFERENCES tickets(ticket_id) NOT NULL,
  checklist_order INTEGER,
  checklist_description VARCHAR(144) NOT NULL,
  is_completed BOOL NOT NULL
);



CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment_date DATE NOT NULL,
  user_id INTEGER REFERENCES users(user_id) NOT NULL,
  ticket_id INTEGER REFERENCES tickets(ticket_id) NOT NULL,
  comment VARCHAR(144) NOT NULL
);





INSERT INTO users(user_username, user_password)
VALUES 
	('user_name1', 'password1'),
	('user_name2', 'password2'),
	('user_name3', 'password3');



INSERT INTO projects(project_name, is_completed) 
VALUES 
	('project_name1', FALSE),
	('project_name2', FALSE),
	('project_name3', FALSE),
	('project_name4', FALSE),
	('project_name5', FALSE),
	('project_name6', FALSE),
	('project_name7', FALSE),
	('project_name8', FALSE),
	('project_name9', FALSE);


INSERT INTO user_project(user_id, project_id) 
VALUES 
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(3, 7),
	(3, 8),
	(3, 9);


INSERT INTO tickets
(project_id, 
 user_id, 
 ticket_name, 
 ticket_created, 
 ticket_priority, 
 ticket_completed)
 VALUES 
 (1, 1, 'name1', '02/05/2022', 3, FALSE),
 (1, 1, 'name2', '02/05/2022', 3, FALSE),
 (1, 1, 'name3', '02/05/2022', 3, FALSE),
 (1, 1, 'name4', '02/05/2022', 3, FALSE),
 (1, 1, 'name5', '02/05/2022', 3, FALSE),
 
 (2, 1, 'name1', '02/05/2022', 3, FALSE),
 (2, 1, 'name2', '02/05/2022', 3, FALSE),
 (2, 1, 'name3', '02/05/2022', 3, FALSE),
 (2, 1, 'name4', '02/05/2022', 3, FALSE),
 (2, 1, 'name5', '02/05/2022', 3, FALSE),
 
 (3, 1, 'name1', '02/05/2022', 3, FALSE),
 (3, 1, 'name2', '02/05/2022', 3, FALSE),
 (3, 1, 'name3', '02/05/2022', 3, FALSE),
 (3, 1, 'name4', '02/05/2022', 3, FALSE),
 (3, 1, 'name5', '02/05/2022', 3, FALSE),
 
 (4, 2, 'name1', '02/05/2022', 3, FALSE),
 (4, 2, 'name2', '02/05/2022', 3, FALSE),
 (4, 2, 'name3', '02/05/2022', 3, FALSE),
 (4, 2, 'name4', '02/05/2022', 3, FALSE),
 (4, 2, 'name5', '02/05/2022', 3, FALSE),
 
 (5, 2, 'name1', '02/05/2022', 3, FALSE),
 (5, 2, 'name2', '02/05/2022', 3, FALSE),
 (5, 2, 'name3', '02/05/2022', 3, FALSE),
 (5, 2, 'name4', '02/05/2022', 3, FALSE),
 (5, 2, 'name5', '02/05/2022', 3, FALSE),
 
 (6, 2, 'name1', '02/05/2022', 3, FALSE),
 (6, 2, 'name2', '02/05/2022', 3, FALSE),
 (6, 2, 'name3', '02/05/2022', 3, FALSE),
 (6, 2, 'name4', '02/05/2022', 3, FALSE),
 (6, 2, 'name5', '02/05/2022', 3, FALSE),
 
 (7, 3, 'name1', '02/05/2022', 3, FALSE),
 (7, 3, 'name2', '02/05/2022', 3, FALSE),
 (7, 3, 'name3', '02/05/2022', 3, FALSE),
 (7, 3, 'name4', '02/05/2022', 3, FALSE),
 (7, 3, 'name5', '02/05/2022', 3, FALSE),
 
 (8, 3, 'name1', '02/05/2022', 3, FALSE),
 (8, 3, 'name2', '02/05/2022', 3, FALSE),
 (8, 3, 'name3', '02/05/2022', 3, FALSE),
 (8, 3, 'name4', '02/05/2022', 3, FALSE),
 (8, 3, 'name5', '02/05/2022', 3, FALSE),
 
 (9, 3, 'name1', '02/05/2022', 3, FALSE),
 (9, 3, 'name2', '02/05/2022', 3, FALSE),
 (9, 3, 'name3', '02/05/2022', 3, FALSE),
 (9, 3, 'name4', '02/05/2022', 3, FALSE),
 (9, 3, 'name5', '02/05/2022', 3, FALSE);




INSERT INTO checklist (ticket_id, checklist_description, is_completed)
VALUES
	(1, 'NOTES1', FALSE),
	(1, 'NOTES2', FALSE),
	(1, 'NOTES3', FALSE),
	(1, 'NOTES4', FALSE),
	(1, 'NOTES5', FALSE),
	
	(2, 'NOTES1', FALSE),
	(2, 'NOTES2', FALSE),
	(2, 'NOTES3', FALSE),
	(2, 'NOTES4', FALSE),
	(2, 'NOTES5', FALSE),
	
	(3, 'NOTES1', FALSE),
	(3, 'NOTES2', FALSE),
	(3, 'NOTES3', FALSE),
	(3, 'NOTES4', FALSE),
	(3, 'NOTES5', FALSE),
	
	(4, 'NOTES1', FALSE),
	(4, 'NOTES2', FALSE),
	(4, 'NOTES3', FALSE),
	(4, 'NOTES4', FALSE),
	(4, 'NOTES5', FALSE),

	(5, 'NOTES1', FALSE),
	(5, 'NOTES2', FALSE),
	(5, 'NOTES3', FALSE),
	(5, 'NOTES4', FALSE),
	(5, 'NOTES5', FALSE),
	
	(6, 'NOTES1', FALSE),
	(6, 'NOTES2', FALSE),
	(6, 'NOTES3', FALSE),
	(6, 'NOTES4', FALSE),
	(6, 'NOTES5', FALSE),
	
	(7, 'NOTES1', FALSE),
	(7, 'NOTES2', FALSE),
	(7, 'NOTES3', FALSE),
	(7, 'NOTES4', FALSE),
	(7, 'NOTES5', FALSE),
	
	(8, 'NOTES1', FALSE),
	(8, 'NOTES2', FALSE),
	(8, 'NOTES3', FALSE),
	(8, 'NOTES4', FALSE),
	(8, 'NOTES5', FALSE),
	
	(9, 'NOTES1', FALSE),
	(9, 'NOTES2', FALSE),
	(9, 'NOTES3', FALSE),
	(9, 'NOTES4', FALSE),
	(9, 'NOTES5', FALSE),
	
	(10, 'NOTES1', FALSE),
	(10, 'NOTES2', FALSE),
	(10, 'NOTES3', FALSE),
	(10, 'NOTES4', FALSE),
	(10, 'NOTES5', FALSE),
	
	(11, 'NOTES1', FALSE),
	(11, 'NOTES2', FALSE),
	(11, 'NOTES3', FALSE),
	(11, 'NOTES4', FALSE),
	(11, 'NOTES5', FALSE),
	
	(12, 'NOTES1', FALSE),
	(12, 'NOTES2', FALSE),
	(12, 'NOTES3', FALSE),
	(12, 'NOTES4', FALSE),
	(12, 'NOTES5', FALSE),
	
	(13, 'NOTES1', FALSE),
	(13, 'NOTES2', FALSE),
	(13, 'NOTES3', FALSE),
	(13, 'NOTES4', FALSE),
	(13, 'NOTES5', FALSE),
	
	(14, 'NOTES1', FALSE),
	(14, 'NOTES2', FALSE),
	(14, 'NOTES3', FALSE),
	(14, 'NOTES4', FALSE),
	(14, 'NOTES5', FALSE),
	
	(15, 'NOTES1', FALSE),
	(15, 'NOTES2', FALSE),
	(15, 'NOTES3', FALSE),
	(15, 'NOTES4', FALSE),
	(15, 'NOTES5', FALSE),
	
	(16, 'NOTES1', FALSE),
	(16, 'NOTES2', FALSE),
	(16, 'NOTES3', FALSE),
	(16, 'NOTES4', FALSE),
	(16, 'NOTES5', FALSE),
	
	(17, 'NOTES1', FALSE),
	(17, 'NOTES2', FALSE),
	(17, 'NOTES3', FALSE),
	(17, 'NOTES4', FALSE),
	(17, 'NOTES5', FALSE),
	
	(18, 'NOTES1', FALSE),
	(18, 'NOTES2', FALSE),
	(18, 'NOTES3', FALSE),
	(18, 'NOTES4', FALSE),
	(18, 'NOTES5', FALSE),
	
	(19, 'NOTES1', FALSE),
	(19, 'NOTES2', FALSE),
	(19, 'NOTES3', FALSE),
	(19, 'NOTES4', FALSE),
	(19, 'NOTES5', FALSE),
	
	(20, 'NOTES1', FALSE),
	(20, 'NOTES2', FALSE),
	(20, 'NOTES3', FALSE),
	(20, 'NOTES4', FALSE),
	(20, 'NOTES5', FALSE),
	
	(21, 'NOTES1', FALSE),
	(21, 'NOTES2', FALSE),
	(21, 'NOTES3', FALSE),
	(21, 'NOTES4', FALSE),
	(21, 'NOTES5', FALSE),
	
	(22, 'NOTES1', FALSE),
	(22, 'NOTES2', FALSE),
	(22, 'NOTES3', FALSE),
	(22, 'NOTES4', FALSE),
	(22, 'NOTES5', FALSE),
	
	(23, 'NOTES1', FALSE),
	(23, 'NOTES2', FALSE),
	(23, 'NOTES3', FALSE),
	(23, 'NOTES4', FALSE),
	(23, 'NOTES5', FALSE),
	
	(24, 'NOTES1', FALSE),
	(24, 'NOTES2', FALSE),
	(24, 'NOTES3', FALSE),
	(24, 'NOTES4', FALSE),
	(24, 'NOTES5', FALSE),
	
	(25, 'NOTES1', FALSE),
	(25, 'NOTES2', FALSE),
	(25, 'NOTES3', FALSE),
	(25, 'NOTES4', FALSE),
	(25, 'NOTES5', FALSE),
	
	(26, 'NOTES1', FALSE),
	(26, 'NOTES2', FALSE),
	(26, 'NOTES3', FALSE),
	(26, 'NOTES4', FALSE),
	(26, 'NOTES5', FALSE),
	
	(26, 'NOTES1', FALSE),
	(26, 'NOTES2', FALSE),
	(26, 'NOTES3', FALSE),
	(26, 'NOTES4', FALSE),
	(26, 'NOTES5', FALSE),
	
	(27, 'NOTES1', FALSE),
	(27, 'NOTES2', FALSE),
	(27, 'NOTES3', FALSE),
	(27, 'NOTES4', FALSE),
	(27, 'NOTES5', FALSE),
	
	(28, 'NOTES1', FALSE),
	(28, 'NOTES2', FALSE),
	(28, 'NOTES3', FALSE),
	(28, 'NOTES4', FALSE),
	(28, 'NOTES5', FALSE),
	
	(29, 'NOTES1', FALSE),
	(29, 'NOTES2', FALSE),
	(29, 'NOTES3', FALSE),
	(29, 'NOTES4', FALSE),
	(29, 'NOTES5', FALSE),
	
	(30, 'NOTES1', FALSE),
	(30, 'NOTES2', FALSE),
	(30, 'NOTES3', FALSE),
	(30, 'NOTES4', FALSE),
	(30, 'NOTES5', FALSE),
	
	(31, 'NOTES1', FALSE),
	(31, 'NOTES2', FALSE),
	(31, 'NOTES3', FALSE),
	(31, 'NOTES4', FALSE),
	(31, 'NOTES5', FALSE),
	
	(32, 'NOTES1', FALSE),
	(32, 'NOTES2', FALSE),
	(32, 'NOTES3', FALSE),
	(32, 'NOTES4', FALSE),
	(32, 'NOTES5', FALSE),
	
	(33, 'NOTES1', FALSE),
	(33, 'NOTES2', FALSE),
	(33, 'NOTES3', FALSE),
	(33, 'NOTES4', FALSE),
	(33, 'NOTES5', FALSE),
	
	(34, 'NOTES1', FALSE),
	(34, 'NOTES2', FALSE),
	(34, 'NOTES3', FALSE),
	(34, 'NOTES4', FALSE),
	(34, 'NOTES5', FALSE),
	
	(35, 'NOTES1', FALSE),
	(35, 'NOTES2', FALSE),
	(35, 'NOTES3', FALSE),
	(35, 'NOTES4', FALSE),
	(35, 'NOTES5', FALSE),
	
	(36, 'NOTES1', FALSE),
	(36, 'NOTES2', FALSE),
	(36, 'NOTES3', FALSE),
	(36, 'NOTES4', FALSE),
	(36, 'NOTES5', FALSE),
	
	(37, 'NOTES1', FALSE),
	(37, 'NOTES2', FALSE),
	(37, 'NOTES3', FALSE),
	(37, 'NOTES4', FALSE),
	(37, 'NOTES5', FALSE),
	
	(38, 'NOTES1', FALSE),
	(38, 'NOTES2', FALSE),
	(38, 'NOTES3', FALSE),
	(38, 'NOTES4', FALSE),
	(38, 'NOTES5', FALSE),
	
	(39, 'NOTES1', FALSE),
	(39, 'NOTES2', FALSE),
	(39, 'NOTES3', FALSE),
	(39, 'NOTES4', FALSE),
	(39, 'NOTES5', FALSE),
	
	(40, 'NOTES1', FALSE),
	(40, 'NOTES2', FALSE),
	(40, 'NOTES3', FALSE),
	(40, 'NOTES4', FALSE),
	(40, 'NOTES5', FALSE),
	
	(41, 'NOTES1', FALSE),
	(41, 'NOTES2', FALSE),
	(41, 'NOTES3', FALSE),
	(41, 'NOTES4', FALSE),
	(41, 'NOTES5', FALSE),
	
	(42, 'NOTES1', FALSE),
	(42, 'NOTES2', FALSE),
	(42, 'NOTES3', FALSE),
	(42, 'NOTES4', FALSE),
	(42, 'NOTES5', FALSE),
	
	(43, 'NOTES1', FALSE),
	(43, 'NOTES2', FALSE),
	(43, 'NOTES3', FALSE),
	(43, 'NOTES4', FALSE),
	(43, 'NOTES5', FALSE),
	
	(43, 'NOTES1', FALSE),
	(43, 'NOTES2', FALSE),
	(43, 'NOTES3', FALSE),
	(43, 'NOTES4', FALSE),
	(43, 'NOTES5', FALSE),
	
	(45, 'NOTES1', FALSE),
	(45, 'NOTES2', FALSE),
	(45, 'NOTES3', FALSE),
	(45, 'NOTES4', FALSE),
	(45, 'NOTES5', FALSE);



INSERT INTO comments (comment_date, user_id, ticket_id, comment)
VALUES 
	('05/01/2022', 1, 1, 'comment1'),
	('05/01/2022', 1, 1, 'comment2'),
	('05/01/2022', 1, 1, 'comment3'),
	('05/01/2022', 1, 1, 'comment4'),
	('05/01/2022', 1, 1, 'comment5'),

	('05/01/2022', 1, 2, 'comment1'),
	('05/01/2022', 1, 2, 'comment2'),
	('05/01/2022', 1, 2, 'comment3'),
	('05/01/2022', 1, 2, 'comment4'),
	('05/01/2022', 1, 2, 'comment5'),
	
	('05/01/2022', 1, 3, 'comment1'),
	('05/01/2022', 1, 3, 'comment2'),
	('05/01/2022', 1, 3, 'comment3'),
	('05/01/2022', 1, 3, 'comment4'),
	('05/01/2022', 1, 3, 'comment5'),
	
	('05/01/2022', 1, 4, 'comment1'),
	('05/01/2022', 1, 4, 'comment2'),
	('05/01/2022', 1, 4, 'comment3'),
	('05/01/2022', 1, 4, 'comment4'),
	('05/01/2022', 1, 4, 'comment5'),
	
	('05/01/2022', 1, 5, 'comment1'),
	('05/01/2022', 1, 5, 'comment2'),
	('05/01/2022', 1, 5, 'comment3'),
	('05/01/2022', 1, 5, 'comment4'),
	('05/01/2022', 1, 5, 'comment5'),
	
	('05/01/2022', 1, 6, 'comment1'),
	('05/01/2022', 1, 6, 'comment2'),
	('05/01/2022', 1, 6, 'comment3'),
	('05/01/2022', 1, 6, 'comment4'),
	('05/01/2022', 1, 6, 'comment5'),
	
	('05/01/2022', 1, 7, 'comment1'),
	('05/01/2022', 1, 7, 'comment2'),
	('05/01/2022', 1, 7, 'comment3'),
	('05/01/2022', 1, 7, 'comment4'),
	('05/01/2022', 1, 7, 'comment5'),
	
	('05/01/2022', 1, 8, 'comment1'),
	('05/01/2022', 1, 8, 'comment2'),
	('05/01/2022', 1, 8, 'comment3'),
	('05/01/2022', 1, 8, 'comment4'),
	('05/01/2022', 1, 8, 'comment5'),
	
	('05/01/2022', 1, 9, 'comment1'),
	('05/01/2022', 1, 9, 'comment2'),
	('05/01/2022', 1, 9, 'comment3'),
	('05/01/2022', 1, 9, 'comment4'),
	('05/01/2022', 1, 9, 'comment5'),
	
	('05/01/2022', 1, 10, 'comment1'),
	('05/01/2022', 1, 10, 'comment2'),
	('05/01/2022', 1, 10, 'comment3'),
	('05/01/2022', 1, 10, 'comment4'),
	('05/01/2022', 1, 10, 'comment5'),
	
	('05/01/2022', 1, 11, 'comment1'),
	('05/01/2022', 1, 11, 'comment2'),
	('05/01/2022', 1, 11, 'comment3'),
	('05/01/2022', 1, 11, 'comment4'),
	('05/01/2022', 1, 11, 'comment5'),
	
	('05/01/2022', 1, 12, 'comment1'),
	('05/01/2022', 1, 12, 'comment2'),
	('05/01/2022', 1, 12, 'comment3'),
	('05/01/2022', 1, 12, 'comment4'),
	('05/01/2022', 1, 12, 'comment5'),
	
	('05/01/2022', 1, 13, 'comment1'),
	('05/01/2022', 1, 13, 'comment2'),
	('05/01/2022', 1, 13, 'comment3'),
	('05/01/2022', 1, 13, 'comment4'),
	('05/01/2022', 1, 13, 'comment5'),
	
	('05/01/2022', 1, 14, 'comment1'),
	('05/01/2022', 1, 14, 'comment2'),
	('05/01/2022', 1, 14, 'comment3'),
	('05/01/2022', 1, 14, 'comment4'),
	('05/01/2022', 1, 14, 'comment5'),
	
	('05/01/2022', 1, 15, 'comment1'),
	('05/01/2022', 1, 15, 'comment2'),
	('05/01/2022', 1, 15, 'comment3'),
	('05/01/2022', 1, 15, 'comment4'),
	('05/01/2022', 1, 15, 'comment5'),
	
	('05/01/2022', 2, 16, 'comment1'),
	('05/01/2022', 2, 16, 'comment2'),
	('05/01/2022', 2, 16, 'comment3'),
	('05/01/2022', 2, 16, 'comment4'),
	('05/01/2022', 2, 16, 'comment5'),

	('05/01/2022', 2, 17, 'comment1'),
	('05/01/2022', 2, 17, 'comment2'),
	('05/01/2022', 2, 17, 'comment3'),
	('05/01/2022', 2, 17, 'comment4'),
	('05/01/2022', 2, 17, 'comment5'),
	
	('05/01/2022', 2, 18, 'comment1'),
	('05/01/2022', 2, 18, 'comment2'),
	('05/01/2022', 2, 18, 'comment3'),
	('05/01/2022', 2, 18, 'comment4'),
	('05/01/2022', 2, 18, 'comment5'),
	
	('05/01/2022', 2, 19, 'comment1'),
	('05/01/2022', 2, 19, 'comment2'),
	('05/01/2022', 2, 19, 'comment3'),
	('05/01/2022', 2, 19, 'comment4'),
	('05/01/2022', 2, 19, 'comment5'),
	
	('05/01/2022', 2, 20, 'comment1'),
	('05/01/2022', 2, 20, 'comment2'),
	('05/01/2022', 2, 20, 'comment3'),
	('05/01/2022', 2, 20, 'comment4'),
	('05/01/2022', 2, 20, 'comment5'),
	
	('05/01/2022', 2, 21, 'comment1'),
	('05/01/2022', 2, 21, 'comment2'),
	('05/01/2022', 2, 21, 'comment3'),
	('05/01/2022', 2, 21, 'comment4'),
	('05/01/2022', 2, 21, 'comment5'),
	
	('05/01/2022', 2, 22, 'comment1'),
	('05/01/2022', 2, 22, 'comment2'),
	('05/01/2022', 2, 22, 'comment3'),
	('05/01/2022', 2, 22, 'comment4'),
	('05/01/2022', 2, 22, 'comment5'),
	
	('05/01/2022', 2, 23, 'comment1'),
	('05/01/2022', 2, 23, 'comment2'),
	('05/01/2022', 2, 23, 'comment3'),
	('05/01/2022', 2, 23, 'comment4'),
	('05/01/2022', 2, 23, 'comment5'),
	
	('05/01/2022', 2, 24, 'comment1'),
	('05/01/2022', 2, 24, 'comment2'),
	('05/01/2022', 2, 24, 'comment3'),
	('05/01/2022', 2, 24, 'comment4'),	
	('05/01/2022', 2, 24, 'comment5'),
	
	('05/01/2022', 2, 25, 'comment1'),
	('05/01/2022', 2, 25, 'comment2'),
	('05/01/2022', 2, 25, 'comment3'),
	('05/01/2022', 2, 25, 'comment4'),
	('05/01/2022', 2, 25, 'comment5'),
	
	('05/01/2022', 2, 26, 'comment1'),
	('05/01/2022', 2, 26, 'comment2'),
	('05/01/2022', 2, 26, 'comment3'),
	('05/01/2022', 2, 26, 'comment4'),
	('05/01/2022', 2, 26, 'comment5'),
	
	('05/01/2022', 2, 27, 'comment1'),
	('05/01/2022', 2, 27, 'comment2'),
	('05/01/2022', 2, 27, 'comment3'),
	('05/01/2022', 2, 27, 'comment4'),
	('05/01/2022', 2, 27, 'comment5'),
	
	('05/01/2022', 2, 28, 'comment1'),
	('05/01/2022', 2, 28, 'comment2'),
	('05/01/2022', 2, 28, 'comment3'),
	('05/01/2022', 2, 28, 'comment4'),
	('05/01/2022', 2, 28, 'comment5'),
	
	('05/01/2022', 2, 29, 'comment1'),
	('05/01/2022', 2, 29, 'comment2'),
	('05/01/2022', 2, 29, 'comment3'),
	('05/01/2022', 2, 29, 'comment4'),
	('05/01/2022', 2, 29, 'comment5'),
	
	('05/01/2022', 2, 30, 'comment1'),
	('05/01/2022', 2, 30, 'comment2'),
	('05/01/2022', 2, 30, 'comment3'),
	('05/01/2022', 2, 30, 'comment4'),
	('05/01/2022', 2, 30, 'comment5'),
	
	('05/01/2022', 3, 31, 'comment1'),
	('05/01/2022', 3, 31, 'comment2'),
	('05/01/2022', 3, 31, 'comment3'),
	('05/01/2022', 3, 31, 'comment4'),
	('05/01/2022', 3, 31, 'comment5'),

	('05/01/2022', 3, 32, 'comment1'),
	('05/01/2022', 3, 32, 'comment2'),
	('05/01/2022', 3, 32, 'comment3'),
	('05/01/2022', 3, 32, 'comment4'),
	('05/01/2022', 3, 32, 'comment5'),
	
	('05/01/2022', 3, 33, 'comment1'),
	('05/01/2022', 3, 33, 'comment2'),
	('05/01/2022', 3, 33, 'comment3'),
	('05/01/2022', 3, 33, 'comment4'),
	('05/01/2022', 3, 33, 'comment5'),
	
	('05/01/2022', 3, 34, 'comment1'),
	('05/01/2022', 3, 34, 'comment2'),
	('05/01/2022', 3, 34, 'comment3'),
	('05/01/2022', 3, 34, 'comment4'),
	('05/01/2022', 3, 34, 'comment5'),
	
	('05/01/2022', 3, 35, 'comment1'),
	('05/01/2022', 3, 35, 'comment2'),
	('05/01/2022', 3, 35, 'comment3'),
	('05/01/2022', 3, 35, 'comment4'),
	('05/01/2022', 3, 35, 'comment5'),
	
	('05/01/2022', 3, 36, 'comment1'),
	('05/01/2022', 3, 36, 'comment2'),
	('05/01/2022', 3, 36, 'comment3'),
	('05/01/2022', 3, 36, 'comment4'),
	('05/01/2022', 3, 36, 'comment5'),
	
	('05/01/2022', 3, 37, 'comment1'),
	('05/01/2022', 3, 37, 'comment2'),
	('05/01/2022', 3, 37, 'comment3'),
	('05/01/2022', 3, 37, 'comment4'),
	('05/01/2022', 3, 37, 'comment5'),
	
	('05/01/2022', 3, 38, 'comment1'),
	('05/01/2022', 3, 38, 'comment2'),
	('05/01/2022', 3, 38, 'comment3'),
	('05/01/2022', 3, 38, 'comment4'),
	('05/01/2022', 3, 38, 'comment5'),
	
	('05/01/2022', 3, 39, 'comment1'),
	('05/01/2022', 3, 39, 'comment2'),
	('05/01/2022', 3, 39, 'comment3'),
	('05/01/2022', 3, 39, 'comment4'),	
	('05/01/2022', 3, 39, 'comment5'),
	
	('05/01/2022', 3, 40, 'comment1'),
	('05/01/2022', 3, 40, 'comment2'),
	('05/01/2022', 3, 40, 'comment3'),
	('05/01/2022', 3, 40, 'comment4'),
	('05/01/2022', 3, 40, 'comment5'),
	
	('05/01/2022', 3, 41, 'comment1'),
	('05/01/2022', 3, 41, 'comment2'),
	('05/01/2022', 3, 41, 'comment3'),
	('05/01/2022', 3, 41, 'comment4'),
	('05/01/2022', 3, 41, 'comment5'),
	
	('05/01/2022', 3, 42, 'comment1'),
	('05/01/2022', 3, 42, 'comment2'),
	('05/01/2022', 3, 42, 'comment3'),
	('05/01/2022', 3, 42, 'comment4'),
	('05/01/2022', 3, 42, 'comment5'),
	
	('05/01/2022', 3, 43, 'comment1'),
	('05/01/2022', 3, 43, 'comment2'),
	('05/01/2022', 3, 43, 'comment3'),
	('05/01/2022', 3, 43, 'comment4'),
	('05/01/2022', 3, 43, 'comment5'),
	
	('05/01/2022', 3, 44, 'comment1'),
	('05/01/2022', 3, 44, 'comment2'),
	('05/01/2022', 3, 44, 'comment3'),
	('05/01/2022', 3, 44, 'comment4'),
	('05/01/2022', 3, 44, 'comment5'),
	
	('05/01/2022', 3, 45, 'comment1'),
	('05/01/2022', 3, 45, 'comment2'),
	('05/01/2022', 3, 45, 'comment3'),
	('05/01/2022', 3, 45, 'comment4'),
	('05/01/2022', 3, 45, 'comment5');