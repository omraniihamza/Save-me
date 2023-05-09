const express = require("express");
const router = express.Router();
const db = require("../../dbconnection"); 

router.post("/AccountTechnicien", (req, res) => { 
    const {nom,prenom,code_postal,telephone,email,password} = req.body;
    db.query(
      `SELECT COUNT(*) AS count FROM operateur WHERE telephone = ? OR email = ?`,
      [telephone, email],
      (error, results) => {
        if (error) {
          res.json({
            result: false,
            result_code: 0,
            result_message: "Failed to create Operateur Account",
          });
        } else {
          // If count is greater than 0, then either the email or telephone already exist in the database
          if (results[0].count > 0) {
            res.json({
              result: false,
              result_code: 1,
              result_message:
                "Account with the provided email or telephone already exists",
            });
          } else {
            // If count is 0, then the email and telephone do not exist in the database, so perform the INSERT operation
            db.query(
              `INSERT INTO techniciens(nom,prenom,code_postal,telephone,email,password) VALUES  (?, ?, ?, ?, ?, ?) `,
              [nom,prenom,code_postal,telephone,email,password],
              (error, results) => {
                if (error) {
                  res.json({
                    result: false,
                    result_code: 3,
                    result_message: "Failed to create Operateur Account",
                  });
                } else {
                  res.json({
                    result: true,
                    result_code: 4,
                    result_message: "Account created successfully",
                  });
                }
              }
            );
          }
        }
      }
    );
    });
router.delete("/technicienDelete/:id", (req, res) => {
  
    const {id} = req.params;
    db.query("DELETE FROM techniciens WHERE id = ?", [id],
    (error, results) =>{
     console.log(results);
 
     if (error) {
       console.log(error);
       res.status(500).json({ message: "Server error" });
     }else {
         res.json({
       result: true,
       result_code: 1,
       result_message: "Technicien Removed Successfuly",
     })
 } });
  
});
router.post('/updateTechnicien/:id',(req,res)=>{
  const {id}= req.params;
  const {nom ,prenom, code_postal,telephone,password,email} = req.body;
  db.query("UPDATE techniciens SET nom = ? , prenom = ? , code_postal = ?, telephone = ? , password = ?, email = ? WHERE id = ? ;",[nom ,prenom, code_postal,telephone,password,email,id],(error,results)=>{
    console.log(results);
 
    if (error) { { 
      console.log(error);
        res.json({
        result: false,
        result_code: 0,
        result_message: "Failed To Update Technicien Account",
      })
    }
  }else {
      res.json({
    result: true,
    result_code: 1,
    result_message: "Account Updated Successfully",
  
    
  })
}

  })
})




module.exports = router;