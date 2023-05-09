const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/message/:id", (req, res) => {
  const { id } = req.params;
 

  db.query(`SELECT * FROM message WHERE id_technicien = ?`, [id], (error, results) => {
    if (error) {
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !! list not found",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success",
        data :results
     });
    }
  });
});

module.exports = router;
