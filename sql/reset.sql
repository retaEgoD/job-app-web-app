DELETE FROM job_applications;
DELETE FROM users;
DELETE FROM job_locations;

INSERT INTO users (UserId, UserName, Email)
VALUES 
	(0, "Dirk", "x@y.z"),
    (1, "Grod", "a@b.c");
    
INSERT INTO job_locations
VALUES 
	(0, 'Melbourne'),
    (0, "Sydney"),
    (1, "Melbourne");

INSERT INTO job_applications (JobId, UserId, JobLocationsId, JobTitle)
VALUES 
	(0, 0, 0, "God"),
    (1, 1, 1, "doG");