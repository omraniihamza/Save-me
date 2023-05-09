const express = require("express");
const router = express.Router();
const db = require("../dbConnection"); 

router.post("/feedback/:id_technicien/:id_incident", (req, res) => {
    const {id_technicien, id_incident} = req.params;
    const { description, signature,image } = req.body;
    db.query("INSERT INTO feedback (description, signature, image, id_technicien, id_incident) VALUES (?, ?, ?, ?, ?)"
    , [ description,signature,image,id_technicien,id_incident],(error,results) =>{
      console.log(results);
      if (error) { 
        console.log(error); 
        res.json({
          result: false,
          result_code: 0,
          result_message: "Server error"
        });
      }
      
      const sqlquery = db.query( "SELECT incidents.id, feedback.id_incident FROM incidents JOIN feedback ON feedback.id_incident = incidents.id" ,[],(error,results)=>{
        console.log(results);
        if (error) {
          console.log(error); 
          res.json({
            result: false,
            result_code: 1,
            result_message: "Server error"

          });

        } if (sqlquery ){
          db.query("UPDATE incidents SET etat = 'DONE' WHERE etat = 'IN PROGRESS' AND id= ? "  ,[id_incident,id_technicien],(error,results)=>
          { if (error) {
            console.log(error);
            res.json({
              result: false,
              result_code: 1,
              result_message: "Server error"
  
            });
  
          } else {
            res.json({
              result: true,
              result_code: 1,
              result_message: "DONE DEAL !!!"
  
            });


          }

          }

          )

        }

      })
    }); 
    });
    
module.exports = router;
