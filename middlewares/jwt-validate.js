// //se crea para  validar el token y poder vsalidar en vairos requests
// // se reutliza en variois lados

const jwt = require('jsonwebtoken')

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// middleware to validate token (rutas protegidas)  
//en este middle la fx recibe 3 param. req para tener acc. //res para respo y next a seguir 
const verifyToken = (req, res, next) => {  //aca creamos una fx recibe req res y next para seguir
  const token = req.header('auth-token')   //aca leemos del header 
  if (!token) {     //si token == null se denega el acceso 
    return res.status(401).json({ error: `Acceso denegado ` })   
  }

  try {      //si llega el token lo verificamos
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)    //aca le pasamos el token q trajimos y la clave secreta
    req.user = verified  //parsea el token  //en el verify se guarda el payload(q son los datos q pasamos user//mail//si es admmin, etc) 
    //al paremetro req le agregamos info
    next(); // continuamos hacia el manejador de la ruta
  } catch (error) {
    res.status(400).json({error: 'El Token no es válido'})
  }
}
// //esta fx se podria hacer en index o autoh pero para usarlo
// //en varios lados lo creamos como midllewaer

module.exports = {
  verifyToken,    //exporta la fx verifytoken  
      
};
