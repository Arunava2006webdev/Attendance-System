// Attendance Array

let attendanceData = [];

// Load Attendance Report

async function loadReport(){

   // Get Filter Values

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
         "date"
      ).value;

   // Fetch Data From Backend

   const response = await fetch(

      `https://attendance-system-backend-p74u.onrender.com/report?department=${department}&semester=${semester}&subject=${subject}&date=${date}`

   );

   attendanceData =
      await response.json();

   console.log(attendanceData);

   renderReport();

}

// Render Report Table

function renderReport(){

   const table =

      document.getElementById(
         "reportBody"
      );

   table.innerHTML = "";

   attendanceData.forEach((item)=>{

      const row =
         document.createElement("tr");

      row.innerHTML = `

         <td>${item.roll}</td>

         <td>${item.name}</td>

         <td>${item.department}</td>

         <td>${item.semester}</td>

         <td>${item.subject}</td>

         <td>${item.status}</td>

         <td>

            ${new Date(item.date)

               .toLocaleDateString(
                  "en-IN"
               )}

         </td>

      `;

      table.appendChild(row);

   });

}

// Search Function

function searchStudent(){

   const input =

      document.getElementById(
         "searchInput"
      ).value.toLowerCase();

   const rows =

      document.querySelectorAll(
         "#reportBody tr"
      );

   rows.forEach((row)=>{

      const roll =

         row.children[0]

         .innerText.toLowerCase();

      const name =

         row.children[1]

         .innerText.toLowerCase();

      if(

         roll.includes(input)

         ||

         name.includes(input)

      ){

         row.style.display = "";

      }

      else{

         row.style.display = "none";

      }

   });

}

// Logout Function

function logout(){

   localStorage.clear();

   window.location.href =
      "index.html";

}