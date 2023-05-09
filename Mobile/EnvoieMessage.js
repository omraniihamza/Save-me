const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../dbConnection");

router.post("/envoie_message/:id_technicien", (req, res) => {
  const {content } = req.body;
  const { id_technicien } = req.params;

 
  
  db.query( `INSERT INTO message (id_technicien, content) VALUES (?,?)`,[ id_technicien,content],(error, results) => {
    console.log(results);
    if (error) {
      console.log(error);;
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !!",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Message Envoyé !!",
       
     });
    }  
  });
}); 



router.get("/messages/:id", (req, res) => {
  const{id} =req.params

   db.query( "SELECT message_admin FROM message WHERE id = ?",[id],(error, results) => {
   
     if (error) {
       console.log(error);
       res.json({
         result: false,
         result_code: 0,
         result_message: "ERROR !!",
       });
     }
     
      else {
       res.json({
         result: true,
         result_code: 2, 
        data: results,
      });
     }
   });
   });



module.exports = router;
