const express = require("express");
const connection = require("./db");

const cors = require("cors");

const app = express();

/* Middleware */

app.use(cors());

app.use(express.json());

/* Home Route */

app.get("/", (req, res) => {

   res.send("Attendance Server Running");

});

/* Login Route */

app.post("/login",(req,res)=>{

   const { loginType,userId,password }
   = req.body;

   // Teacher Login

   if(loginType === "teacher"){

      const query = `

         SELECT * FROM teachers

         WHERE email = ?
         AND password = ?

      `;

      connection.query(

         query,

         [userId,password],

         (error,result)=>{

            if(error){

            console.log(error);

            return res.status(500).json({

            message:"Server Error"

         });

         }

            else if(result.length > 0){

               res.json({

                  message:"Teacher Login Success"

               });
               

            }

            else{

               res.json({

                  message:"Invalid Credentials"

                });

            }

         }

      );

   }

   // Student Login

   else if(loginType === "student"){

      const query = `

         SELECT * FROM students

         WHERE roll = ?
         AND password = ?

      `;

      connection.query(

         query,

         [userId,password],

         (error,result)=>{

            if(error){

            console.log(error);

            return res.status(500).json({

            message:"Server Error"

            });

         }

            else if(result.length > 0){

               res.json({

                    message:"Student Login Success",

                    student:result[0]

            });

            }

            else{

               res.json({

               message:"Invalid Credentials"

           });

            }

         }

      );

   }
   else {

    return res.status(400).json({
        message: "Invalid Login Type"
    });

}

});

/* Student Route */

app.get("/students",

(req,res)=>{

   const department =
      req.query.department;

   const semester =
      req.query.semester;

   const query = `

      SELECT * FROM students

      WHERE department = ?
      AND semester = ?

   `;

   connection.query(

      query,

      [department,semester],

      (error,result)=>{

         if(error){

   console.log(error);

   return res.status(500).json({

      message:"Server Error"

   });

}

         else{

            res.json(result);

         }

      }

   );

});

/* Attendance Route */

app.post("/attendance",(req,res)=>{

   const {

      roll,
      department,
      semester,
      subject,
      status,
      date

   } = req.body;

   // CHECK DUPLICATE

   const checkQuery = `

      SELECT * FROM attendance

      WHERE roll = ?
      AND subject = ?
      AND date = ?

   `;

   connection.query(

      checkQuery,

      [roll,subject,date],

      (checkError,checkResult)=>{

         if(checkError){

   console.log(checkError);

   return res.status(500).json({

      message:"Server Error"

   });

}

         // Attendance Already Exists

         else if(checkResult.length > 0){

            res.json({

               message:
               "Attendance Already Marked"

            });

         }

         // Insert New Attendance

         else{

            const insertQuery = `

               INSERT INTO attendance

               (
                  roll,
                  department,
                  semester,
                  subject,
                  status,
                  date
               )

               VALUES (?,?,?,?,?,?)

            `;

            connection.query(

               insertQuery,

               [
                  roll,
                  department,
                  semester,
                  subject,
                  status,
                  date
               ],

               (insertError,result)=>{

                  if(insertError){

   console.log(insertError);

   return res.status(500).json({

      message:"Server Error"

   });

}

                  else{

                     res.json({

                        message:
                        "Attendance Saved"

                     });

                  }

               }

            );

         }

      }

   );

});

app.get("/student-attendance/:roll",

(req,res)=>{

   const roll = req.params.roll;

   const query = `

      SELECT * FROM attendance

      WHERE roll = ?

   `;

   connection.query(

      query,

      [roll],

      (error,result)=>{

         if(error){

   console.log(error);

   return res.status(500).json({

      message:"Server Error"

   });

}

         else{

            res.json(result);

         }

      }

   );

});
app.get("/report",(req,res)=>{

   // Get Query Parameters

   const {

      department,
      semester,
      subject,
      date

   } = req.query;

   // SQL Query

   const query = `

      SELECT

         attendance.roll,

         students.name,

         attendance.department,

         attendance.semester,

         attendance.subject,

         attendance.status,

         attendance.date

      FROM attendance

      INNER JOIN students

      ON attendance.roll = students.roll

      WHERE

         attendance.department
         LIKE ?

         AND

         attendance.semester
         LIKE ?

         AND

         attendance.subject
         LIKE ?

         AND

         attendance.date
         LIKE ?

   `;

   // Query Values

   const values = [

      `%${department}%`,

      `%${semester}%`,

      `%${subject}%`,

      `%${date}%`

   ];

   // Execute Query

   connection.query(

      query,

      values,

      (error,result)=>{

         if(error){

   console.log(error);

   return res.status(500).json({

      message:"Server Error"

   });

}

         else{

            res.json(result);

         }

      }

   );

});
/* Server */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

   console.log(`Server Started On Port ${PORT}`);

});