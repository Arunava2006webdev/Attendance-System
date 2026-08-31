// Get Logged In Student Data

const student = JSON.parse(

   localStorage.getItem("student")

);

// Check Login

if(!student){

   alert("Please Login First");

   window.location.href = "index.html";

}

// Show Student Info

document.getElementById(
   "studentName"
).innerText = student.name;

document.getElementById(
   "studentRoll"
).innerText = student.roll;

// Load Attendance Function

async function loadAttendance(){

   // Fetch Attendance

   const response = await fetch(

      `https://attendance-system-backend-p74u.onrender.com/student-attendance/${student.roll}`

   );

   const attendance = await response.json();

   console.log(attendance);

   // Table Body

   const table = document.getElementById(
      "attendanceTable"
   );

   table.innerHTML = "";

   // Summary Variables

   let totalClasses = attendance.length;

   let presentClasses = 0;

   // Subject Data Object

   const subjectData = {};

   // Render Attendance Table

   attendance.forEach((item)=>{

      // Count Present

      if(item.status === "Present"){

         presentClasses++;

      }

      // Subject Wise Data

      if(!subjectData[item.subject]){

         subjectData[item.subject] = {

            total:0,

            present:0

         };

      }

      subjectData[item.subject].total++;

      if(item.status === "Present"){

         subjectData[item.subject].present++;

      }

      // Create Row

      const row =
         document.createElement("tr");

      row.innerHTML = `

         <td>${item.subject}</td>

         <td>${item.status}</td>

         <td>

            ${new Date(item.date)

               .toLocaleDateString("en-IN")}

         </td>

      `;

      table.appendChild(row);

   });

   // Absent Classes

   let absentClasses =

      totalClasses - presentClasses;

   // Attendance Percentage

   let percentage = 0;

   if(totalClasses > 0){

      percentage = (

         presentClasses /

         totalClasses

      ) * 100;

   }

   // Update Summary Cards

   document.getElementById(
      "totalClasses"
   ).innerText = totalClasses;

   document.getElementById(
      "presentClasses"
   ).innerText = presentClasses;

   document.getElementById(
      "absentClasses"
   ).innerText = absentClasses;

   document.getElementById(
      "overallAttendance"
   ).innerText =

      percentage.toFixed(2) + "%";

   // PIE CHART

   const pieCtx =

      document.getElementById(
         "pieChart"
      );

   new Chart(pieCtx,{

      type:"pie",

      data:{

         labels:[

            "Present",
            "Absent"

         ],

         datasets:[{

            data:[

               presentClasses,

               absentClasses

            ],

            backgroundColor:[

               "#22c55e",

               "#ef4444"

            ]

         }]

      }

   });

   // SUBJECT LABELS

   const subjects =

      Object.keys(subjectData);

   // SUBJECT PERCENTAGES

   const percentages =

      subjects.map((subject)=>{

         const total =

            subjectData[subject].total;

         const present =

            subjectData[subject].present;

         return (

            (present / total)

            * 100

         ).toFixed(2);

      });

   // BAR CHART

   const barCtx =

      document.getElementById(
         "barChart"
      );

   new Chart(barCtx,{

      type:"bar",

      data:{

         labels:subjects,

         datasets:[{

            label:"Attendance %",

            data:percentages,

            backgroundColor:"#3b82f6"

         }]

      },

      options:{

         scales:{

            y:{

               beginAtZero:true,

               max:100

            }

         }

      }

   });

}

// Call Function

loadAttendance();
// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
   logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("student");
      window.location.href = "index.html";
   });
}