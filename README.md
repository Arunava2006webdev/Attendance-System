# Attendance Management System

A full-stack web-based Attendance Management System designed to manage student attendance efficiently through separate teacher and student dashboards.

The system allows teachers to manage students, mark attendance, generate attendance reports, and allows students to view their attendance records and attendance percentage.

---

## 🚀 Live Demo

**Live Website:** [Attendance Management System](https://attendance-system-frontend.netlify.app/)

**GitHub Repository:** [View Source Code](https://github.com/Arunava2006webdev/Attendance-System)

---

## 📌 Project Overview

The Attendance Management System is a full-stack web application developed to simplify attendance management for educational institutions.

Teachers can log in, select a department and semester, view students, mark attendance, and generate attendance reports.

Students can log in using their assigned credentials and view their attendance details, including:

- Total classes
- Present classes
- Absent classes
- Attendance percentage
- Attendance charts
- Attendance records

The application is deployed online with a separate frontend, backend, and cloud database.

---

## ✨ Features

### 👨‍🏫 Teacher Features

- Teacher login
- Department selection
- Semester selection
- View students based on department and semester
- Mark students as Present or Absent
- Submit attendance
- Prevent duplicate attendance for the same student, subject, and date
- View attendance reports
- Filter attendance reports
- Teacher logout

### 👨‍🎓 Student Features

- Student login using assigned credentials
- View student name and roll number
- View attendance records
- View total classes
- View present classes
- View absent classes
- Calculate attendance percentage
- Attendance visualization using charts
- Student logout

### 🔐 Authentication

- Separate teacher and student login
- Student information is retrieved from the database
- Student information is temporarily stored using browser localStorage
- No public registration is required
- Accounts are created/provided by the institution

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Backend

- Node.js
- Express.js
- CORS
- REST API

### Database

- MySQL-compatible TiDB Cloud

### Deployment

- Netlify - Frontend
- Render - Backend
- TiDB Cloud - Database

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench
- Postman

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Netlify       │
                    │      Frontend       │
                    │    HTML/CSS/JS      │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ↓
                    ┌─────────────────────┐
                    │       Render        │
                    │   Node.js + Express │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ SQL Queries
                               ↓
                    ┌─────────────────────┐
                    │     TiDB Cloud      │
                    │  MySQL-compatible   │
                    │      Database       │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
Attendance-System/
│
├── Backend/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── index.html
│   ├── teacher-dashboard.html
│   ├── student-dashboard.html
│   ├── attendance-report.html
│   │
│   ├── css/
│   │   └── ...
│   │
│   └── js/
│       └── ...
│
├── README.md
└── .gitignore
```

> The `.env` file is not included in the repository because it contains database credentials.

---

## 🗄️ Database Structure

The application uses the following database:

**Database:** `attendance_system`

### Students Table

Stores student information.

| Column       | Description            |
| ------------ | ---------------------- |
| `id`         | Student ID             |
| `roll`       | Student roll number    |
| `name`       | Student name           |
| `password`   | Student login password |
| `department` | Student department     |
| `semester`   | Student semester       |

### Teachers Table

Stores teacher login information.

| Column     | Description            |
| ---------- | ---------------------- |
| `id`       | Teacher ID             |
| `email`    | Teacher email          |
| `password` | Teacher login password |

### Attendance Table

Stores student attendance records.

| Column       | Description         |
| ------------ | ------------------- |
| `id`         | Attendance ID       |
| `roll`       | Student roll number |
| `subject`    | Subject             |
| `status`     | Present/Absent      |
| `date`       | Attendance date     |
| `department` | Department          |
| `semester`   | Semester            |

---

## 🔌 API Endpoints

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| POST   | `/login`                    | Teacher and student authentication      |
| GET    | `/students`                 | Get students by department and semester |
| POST   | `/attendance`               | Store attendance                        |
| GET    | `/student-attendance/:roll` | Get attendance records for a student    |
| GET    | `/report`                   | Get filtered attendance reports         |

### Example

Get students from CSE 1st Semester:

```text
GET /students?department=CSE&semester=1st%20Sem
```

---

## 🔄 Application Workflow

### Teacher Workflow

```text
Teacher Login
      ↓
Select Department
      ↓
Select Semester
      ↓
Load Students
      ↓
Mark Present / Absent
      ↓
Submit Attendance
      ↓
Attendance Stored in Database
      ↓
View Attendance Report
```

### Student Workflow

```text
Student Login
      ↓
Student Dashboard
      ↓
Fetch Attendance Records
      ↓
Calculate Attendance
      ↓
Display Attendance Percentage
      ↓
Display Charts and Records
```

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Arunava2006webdev/Attendance-System.git
```

### 2. Open the Project

```bash
cd Attendance-System
```

### 3. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 4. Create `.env`

Create a `.env` file inside the `Backend` folder.

Add your own database credentials:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=attendance_system
```

**Never upload your `.env` file or database password to GitHub.**

### 5. Start the Backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:3000
```

### 6. Run the Frontend

Open the `Frontend` folder in Visual Studio Code and launch `index.html` using the **Live Server** extension.

---

## 🌐 Deployment

The application is deployed using the following services:

| Component | Platform   |
| --------- | ---------- |
| Frontend  | Netlify    |
| Backend   | Render     |
| Database  | TiDB Cloud |

### Deployment Flow

```text
User
  ↓
Netlify Frontend
  ↓
Render Backend
  ↓
TiDB Cloud Database
```

The frontend communicates with the Express backend using REST APIs.

The Express backend communicates with the TiDB Cloud database using `mysql2`.

---

## 🔒 Security Notes

- Database credentials are stored using environment variables.
- `.env` is excluded from GitHub using `.gitignore`.
- No database password is included in this repository.
- The project uses institution-provided accounts instead of public registration.
- For a production system, passwords should be securely hashed using a password hashing algorithm such as bcrypt.
- A production version should also implement stronger authentication and authorization mechanisms.

---

## 🔮 Future Improvements

Possible improvements include:

- Secure password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Admin dashboard
- Add/edit/delete students
- Add/edit/delete teachers
- Attendance editing
- Export attendance reports to PDF
- Export reports to Excel
- Email notifications
- Monthly and semester-wise attendance analytics
- Improved mobile responsiveness
- Database backup and recovery
- More advanced authentication and authorization

---

## 🎥 Project Demo

A demonstration video showing the complete application workflow will be added here.

**Demo Video:** Coming soon

---

## 📸 Screenshots

### Login Page

<img width="775" height="630" alt="Login Page" src="https://github.com/user-attachments/assets/b9430283-1e3b-47d9-8dd1-c254c2733b60" />

### Teacher Dashboard

<img width="1522" height="596" alt="Teacher Dashboard" src="https://github.com/user-attachments/assets/c2406a94-8057-4d12-b3bc-07820fc1ebeb" />

### Student Dashboard

<img width="1395" height="657" alt="Student Dashboard" src="https://github.com/user-attachments/assets/f429d022-4def-415f-a1aa-1bddf41b2d73" />

### Attendance Report

<img width="1521" height="517" alt="Attendance Report" src="https://github.com/user-attachments/assets/43c504d4-269d-476b-b2bd-ae58445484f4" />

---

## 👨‍💻 Author

### Arunava Mandal

B.Tech Computer Science and Engineering Student

- 💻 GitHub: [Arunava2006webdev](https://github.com/Arunava2006webdev)
- 🌐 Portfolio: [Visit My Portfolio](https://arunavaportfolio.netlify.app/)
- 🔗 LinkedIn: [View LinkedIn Profile](https://www.linkedin.com/in/arunava-mandal-891a50307/)

---

## 📄 License

This project was developed for educational and portfolio purposes.
