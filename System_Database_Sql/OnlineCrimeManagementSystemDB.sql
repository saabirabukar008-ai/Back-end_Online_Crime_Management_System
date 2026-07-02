CREATE DATABASE OnlineCrimeManagementSystem;
GO
USE OnlineCrimeManagementSystem;
GO

--------------------------------------------------------
-- 1. Users Table
CREATE TABLE Users
(
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Fullname VARCHAR(100),
    Username VARCHAR(50),
    Role VARCHAR(30),
    Phone BIGINT UNIQUE
);

ALTER TABLE Users
ADD Password NVARCHAR(100) NULL;

select * from Users
--update with new password
UPDATE Users SET Password = '1234' WHERE UserId = 1;
UPDATE Users SET Password = '12345' WHERE UserId = 2;
UPDATE Users SET Password = '123456' WHERE UserId = 3;




-- insert into inserts 


INSERT INTO Users (Fullname, Username, Role, Phone) VALUES
('Ahmed Ali','ahmed','Admin',619867128),
('Amina Xasan','amina','Officer',617701518);


--------------------------------------------------------
-- 2. CrimeReports Table
CREATE TABLE CrimeReports
(
    CrimeId INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(110),
    CrimeDate DATETIME,
    Location VARCHAR(100),
    Status VARCHAR(50),
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);



-- inserting crime reports
INSERT INTO CrimeReports (Title, CrimeDate, Location, Status, UserId) VALUES
('Phone Theft','2026-06-17','Mogadishu Wadajir','Pending', 1),
('Car Robbery','2023-07-18','Mogadishu Hodan','Solved', 2);




--------------------------------------------------------
-- 3. Criminals Table
CREATE TABLE Criminals
(
    CriminalId INT PRIMARY KEY IDENTITY(1,1),
    Fullname VARCHAR(100),
    Age INT,
    Address VARCHAR(100),
    Gender VARCHAR(20) NOT NULL,
    CrimeId INT,
    FOREIGN KEY (CrimeId) REFERENCES CrimeReports(CrimeId)
);




-- insert into Criminals
INSERT INTO Criminals (Fullname, Age, Address, Gender, CrimeId)
VALUES
('Mohammed Nur Abdihakin',25,'Howlwadaag','Male', 1),
('Mustaf Ali Abdi',29,'Kaaraan','Male', 2);

--------------------------------------------------------
-- 4. Investigations Table
CREATE TABLE Investigations
(
    InvestigationId INT PRIMARY KEY IDENTITY(1,1),
    OfficerName VARCHAR(100),
    InvestigationDate DATE,
    Status VARCHAR(50),
    CrimeId INT,
    FOREIGN KEY (CrimeId) REFERENCES CrimeReports(CrimeId)
);





-- insert into Investigations table
INSERT INTO Investigations (OfficerName, InvestigationDate, Status, CrimeId)
VALUES
('Sabir Abukar','2026-05-15','Pending', 1),
('Sabir Abukar','2024-06-10','Solved', 2);
--------------------------------------------------------
-- View Data
SELECT * FROM Users;
SELECT * FROM CrimeReports;
SELECT * FROM Criminals;
SELECT * FROM Investigations;


