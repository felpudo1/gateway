const express = require('express');
const router = express.Router();




//creamos un router q no hace nada para saber q esta conectado////
router.get('/', (req, res) =>{  
    return res.send("toy en /articlos") 
    }); //FIN GET  
    //////////////////////////////////////////////////////////////
    module.exports = router;