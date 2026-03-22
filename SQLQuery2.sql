use hospitaldb
go

create table patient(
p_id int primary key identity(1,1),
p_name varchar(100) not null,
contact varchar(15) not null,
age int,
gender varchar(10),
created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE department (
  dep_id INT IDENTITY(1,1) PRIMARY KEY,
  dep_name VARCHAR(100) not null,
  room_no VARCHAR(10),
  is_active bit default 1,
  description varchar(255),
  location varchar(100)
);

CREATE TABLE staff (
    staff_id INT PRIMARY KEY IDENTITY(1,1),
    s_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin','receptionist','doctor')),
    dep_id INT,
    contact VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    is_active BIT DEFAULT 1,
    FOREIGN KEY (dep_id) REFERENCES department(dep_id)
);

CREATE TABLE doctor (
  doctor_id INT IDENTITY(1,1) PRIMARY KEY,
  doctor_name VARCHAR(100) not null,
  dep_id INT,
  staff_id int,
  room_no VARCHAR(10),
  contact VARCHAR(15),
  email VARCHAR(100),
  specialization varchar(100),
  qualification varchar(100),
  is_available bit default 1,
  foreign key (staff_id) references staff(staff_id),
  FOREIGN KEY (dep_id) REFERENCES Department(dep_id)
);

CREATE TABLE token (
  token_id INT IDENTITY(1,1) PRIMARY KEY,
  token_no INT not null,
  p_id INT not null,
  dep_id INT not null,
  doctor_id INT not null,
  visit_type VARCHAR(50),
  queue_position INT,
  est_wait_time INT,
  created_at DATETIME DEFAULT GETDATE(),
  token_date DATE DEFAULT CAST(GETDATE() AS DATE),
  UNIQUE (token_no,doctor_id, token_date),
  status VARCHAR(20) DEFAULT 'waiting',
  FOREIGN KEY (p_id) REFERENCES Patient(p_id),
  FOREIGN KEY (dep_id) REFERENCES Department(dep_id),
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE queue (
  queue_id INT IDENTITY(1,1) PRIMARY KEY,
  dep_id INT,
  doctor_id INT,
  total_waiting INT,
  queue_date date default cast(getdate() as date),
  is_active bit default 1,
  current_token INT DEFAULT 0,
  FOREIGN KEY (dep_id) REFERENCES Department(dep_id),
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE visit (
  visit_id INT IDENTITY(1,1) PRIMARY KEY,
  p_id INT,
  token_id INT,
  visit_type VARCHAR(50),
  notes TEXT,
  visit_date date default cast(getdate() as date),
  FOREIGN KEY (p_id) REFERENCES Patient(p_id),
  FOREIGN KEY (token_id) REFERENCES Token(token_id)
);
CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    staff_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);