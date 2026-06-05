// Student Data

let students = [];

// Attendance Array

let attendanceData = [];

// Table Body

const table = document.getElementById("studentTable");

// Load Students From Backend

async function loadStudents(){

   // Get Selected Values

   const department =

      document.getElementById(
         "department"
      ).value;

   const semester =

      document.getElementById(
         "semester"
      ).value;

   // Fetch Filtered Students

   const response = await fetch(

      `http://localhost:3000/students?department=${department}&semester=${semester}`

   );

   students = await response.json();

   console.log(students);

   renderStudents();

}

// Render Students

function renderStudents(){

   table.innerHTML = "";

   students.forEach((student,index)=>{

      const row = document.createElement("tr");

      row.innerHTML = `

         <td>${student.roll}</td>

         <td>${student.name}</td>

         <td>

            <button
               class="present-btn"
               onclick="markPresent(${index}, this)"
            >
               Present
            </button>

            <button
               class="absent-btn"
               onclick="markAbsent(${index}, this)"
            >
               Absent
            </button>

         </td>

      `;

      table.appendChild(row);

   });

}

// Mark Present

function markPresent(index,button){

   const row =

      button.parentElement.parentElement;

   row.classList.remove("absent-row");

   row.classList.add("present-row");

   // Get Selected Values

   const department =

      document.getElementById(
         "department"
      ).value;

   const semester =

      document.getElementById(
         "semester"
      ).value;

   const subject =

      document.getElementById(
         "subject"
      ).value;

   const date =

      document.getElementById(
         "attendanceDate"
      ).value;

   // Attendance Object

   attendanceData[index] = {

      roll:students[index].roll,

      department:department,

      semester:semester,

      subject:subject,

      status:"Present",

      date:date

   };

   console.log(attendanceData);

// Send Attendance To Backend

  /* fetch("http://localhost:3000/attendance",{

      method:"POST",

      headers:{
         "Content-Type":"application/json"
      },

      body:JSON.stringify(
         attendanceData[index]
      )

   });*/
}

  



// Mark Absent

function markAbsent(index,button){

   const row =

      button.parentElement.parentElement;

   row.classList.remove("present-row");

   row.classList.add("absent-row");

   // Get Selected Values

   const department =

      document.getElementById(
         "department"
      ).value;

   const semester =

      document.getElementById(
         "semester"
      ).value;

   const subject =

      document.getElementById(
         "subject"
      ).value;

   const date =

      document.getElementById(
         "attendanceDate"
      ).value;

   // Attendance Object

   attendanceData[index] = {

      roll:students[index].roll,

      department:department,

      semester:semester,

      subject:subject,

      status:"Absent",

      date:date

   };

   console.log(attendanceData);
   // Send Attendance To Backend
/*
   fetch("http://localhost:3000/attendance",{

      method:"POST",

      headers:{
         "Content-Type":"application/json"
      },

      body:JSON.stringify(
         attendanceData[index]
      )

   });*/

}
// Submit Attendance Button

const submitButton =

document.getElementById(
   "submitAttendance"
);

// Button Click Event

submitButton.addEventListener(

   "click",

   async ()=>{

      for(let i=0;

         i<attendanceData.length;

         i++){

         // Skip Empty Data

         if(!attendanceData[i]){

            continue;

         }

         // Send To Backend

         await fetch(

            "http://localhost:3000/attendance",

            {

               method:"POST",

               headers:{
                  "Content-Type":
                  "application/json"
               },

               body:JSON.stringify(

                  attendanceData[i]

               )

            }

         );

      }

      alert(
         "Attendance Submitted"
      );

   }

);
   

// Load Data When Page Opens

document.getElementById(

   "loadStudentsBtn"

).addEventListener(

   "click",

   loadStudents

);
function openReport(){

   window.location.href =

      "attendance-report.html";

}