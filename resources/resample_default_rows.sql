DELETE FROM job_application;
DELETE FROM user;
DELETE FROM job_location;

INSERT INTO user (user_id, user_name, email)
VALUES 
	(0, "Dirk", "x@y.z"),
    (1, "Grod", "a@b.c");
    
INSERT INTO job_location
VALUES 
	(0, 'Melbourne'),
    (0, "Sydney"),
    (1, "Melbourne");

INSERT INTO job_application (job_id, user_id, job_locations_id, job_title)
VALUES 
	(0, 0, 0, "God"),
    (1, 1, 1, "doG");