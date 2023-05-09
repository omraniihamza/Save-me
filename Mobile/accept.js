const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

// PUT /missions/:id/accept
router.post("/acceptation/:id/:id_technicien", (req, res) => {
  const {id,id_technicien} = req.params;
 
  db.query(
    "SELECT disponibilité  FROM techniciens WHERE id= ?; ",
    [id],
    (error, results) => {
    
      if (error) {
        console.log(error);
        res.json({
          result: false,
          result_code: 0,
          result_message: "ERROR !!",
        });
      }else{

       
      
   

      const disponibilité = results[0].disponibilité;
console.log(disponibilité);
      if (disponibilité == 1) {
        db.query(
          "UPDATE techniciens SET acceptation = 1 WHERE id = ? ",
          [id],
          (error, results) => {
            console.log(results);
            if (error) {
              console.log(error);
              res.json({
                result: false,
                result_code: 1,
                result_message: "ERROR !!", 
              });
            } else if (results.affectedRows === 0) {
              res.json({
                result: false,
                result_code: 2,
                result_message: "Mission Not Found",
              });
            }
            db.query(
              "SELECT acceptation FROM techniciens WHERE id = ? ",
              [id],
              (error, results) => {
                console.log(results);
                if (error) {
                  console.log(error);
                  res.json({
                    result: false,
                    result_code: 3,
                    result_message: "ERROR !!",
                  });
                }

                const acceptation = results[0].acceptation;
                console.log(acceptation);
                if (acceptation == 1) {
                  db.query(
                    "UPDATE incidents SET accepted_by = 1 ,etat = 'IN PROGRESS' ,date_acceptation = CURRENT_TIMESTAMP  WHERE id_technicien = ?",
                    [id_technicien],
                    (error, results) => {
                      console.log(results);
                      if (error) {
                        console.log(error);
                        res.json({
                          result: false,
                          result_code: 4,
                          result_message: "ERROR !!",
                        });
                      } else {
                        res.json({
                          result: true,
                          result_code: 1,
                          result_message: "Success accepted mission !! ",
                        });
                      }
                    }
                  );
                } 
              }
            );
          }
        );
      }else {
        res.json({
          result: false ,
          result_code: 5 ,
          result_message : "Technicien Indisponible !!!"
        })
      }
  


    }   });
      
  });

module.exports = router;
