const express = require("express"); 
const router = express.Router();
const db = require("../../dbConnection");

router.post('/AddMission/:id_operateur', (req, res) => { 
  const {id_operateur} = req.params;
 const {nom,adresse,code_postal,fiche_technique,telephone, details, titre}= req.body; 

  

  db.query(`INSERT INTO incidents (id_operateur,nom,adresse,code_postal,fiche_technique,telephone, details, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
  [id_operateur,nom,adresse,code_postal,fiche_technique,telephone, details, titre], (err, result) => {
    console.log(result);
    console.log(err);
    if (err) {
      console.log(err);
      console.error('Error inserting incident into database: ', err); 
      res.status(500).send('Internal server error');
    } else {
      console.log('Incident inserted successfully');




        

          res.status(200).send('Mission inserted successfully');
        }
      });
    }
  );
module.exports = router;
