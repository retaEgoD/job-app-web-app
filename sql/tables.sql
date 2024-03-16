DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Job_Locations;
DROP TABLE IF EXISTS Job_Locations;


CREATE TABLE Users (
    UserID int PRIMARY KEY,
    UserName varchar(255) NOT NULL UNIQUE,
    FirstName varchar(255),
    LastName varchar(255),
    Password varchar(255),
    AuthToken varchar(255),
    Email varchar(255) NOT NULL UNIQUE
);


CREATE TABLE Job_Locations (
    JobLocationsID int,
    JobLocation varchar(255),
    PRIMARY KEY (JobLocationsId, JobLocation)
);


CREATE TABLE Job_Applications (
    -- Ids
    JobID int PRIMARY KEY,
    UserID int NOT NULL,
    JobLocationsID int,

    -- Main job info
    JobTitle varchar(255),
    Company varchar(255),
    Industry varchar(255),

    -- Salary info
    Salary int,
    IsSuperIncluded boolean,
    IsSalaryRanged boolean,
    SalaryMin int,
    SalaryMax int,

    -- Additional details
    JobListingLink text,
    JobStartingDate date,
    ApplicationStatus varchar(255),
    Notes text,
    FOREIGN KEY (UserId) REFERENCES Users (UserId),
    FOREIGN KEY (JobLocationsId) REFERENCES Job_Locations (JobLocationsId)
);