async function loginUser(){

   const loginType =
      document.getElementById("loginType").value;

   const userId =
      document.getElementById("userId").value;

   const password =
      document.getElementById("password").value;

   /* Request */

   const response = await fetch(
      "http://localhost:3000/login",
      {

         method:"POST",

         headers:{
            "Content-Type":"application/json"
         },

         body:JSON.stringify({

            loginType:loginType,

            userId:userId,

            password:password

         })

      }
   );

   /* Response */

   const result = await response.json();

   console.log(result);

   if(result.message === "Teacher Login Success"){

   window.location.href =
      "teacher-dashboard.html";

}

else if(
   result.message ===
   "Student Login Success"
){

   localStorage.setItem(

      "student",

      JSON.stringify(result.student)

   );

   window.location.href =
      "student-dashboard.html";

}

else{

   alert(result.message);

}

}