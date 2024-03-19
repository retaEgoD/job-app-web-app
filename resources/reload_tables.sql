DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS job_location;
DROP TABLE IF EXISTS job_Application;


CREATE TABLE Users (
    user_id int PRIMARY KEY,
    user_name varchar(255) NOT NULL UNIQUE,
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255),
    auth_token varchar(255),
    email varchar(255) NOT NULL UNIQUE
);


CREATE TABLE Job_Locations (
    job_id int,
    job_location varchar(255),
    PRIMARY KEY (job_id, job_location),
    FOREIGN KEY (job_id) REFERENCES job_application (job_id)
);


CREATE TABLE Job_Application (
    -- Ids
    job_id int PRIMARY KEY,
    user_id int NOT NULL,

    -- Main job info
    job_title varchar(255),
    company varchar(255),
    industry varchar(255),

    -- Salary info
    salary int,
    is_super_included boolean,
    is_salary_ranged boolean,
    salary_min int,
    salary_max int,

    -- Additional details
    job_listing_link text,
    job_starting_date date,
    application_status varchar(255),
    notes text,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);