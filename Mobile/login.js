const express = require("express");
const router = express.Router();
const db = require("../dbconnection" );
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/logintechnicien",  loginValidation, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT id,email, password FROM techniciens WHERE email = ?  LIMIT 1; `,
    [email, password], 
    (err, result) => {
      
      console.log(req.body.email);
      if (err) {
        console.log(err);
        return res.status(400).send({
          msg: err,
        });
      }

      console.log(!result.length);
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }


     
      if (result[0]["password"] != req.body.password) {
        return res.status(401).send({
          msg: "Email or password is incorrect!!",
        });
      } else {
        return res.status(200).send({
          msg: "Logged in!",
          user: result,
        });
      }
    }
  );
});

module.exports = router;
