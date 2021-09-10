//AUTH DE PROYECTOBACK
const jwt = require('jsonwebtoken'); //instalamos para token                                  
const { verifyToken} = require('../middlewares/jwt-validate')
//reqeremimos el TOKKEN_SECRET para traerlo del archivo del middleware 
//traemos el valor del TOKKEN_SECRET
//tbm traemos en la fx verifytoken
const express = require('express');  
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db'); //creao el pool en carp db y traigo la cte.


// const JSONTransport = require('nodemailer/lib/json-transport');

//EMPIEZAN LOS MANEJADORES de ESTE ROUTER router.verbo/login o /auth
//POST LOGIN



//login a la bd
router.post('/login', async function (req, res){
  if (( req.body.mail===""))
  {
      res.status(400).json({ success: false, message: "falta ingresar mail"})
      return; //verificamos que el cuerpo del mail y pass no sea vacios
  }
  else if (( req.body.password===""))
  {
      res.status(400).json({ success: false, message: "falta ingresar password"})
  return; //verificamos que el cuerpo del mail y pass no sea vacios
  }   
 
  try {
    let usersResult = await db.query('SELECT mail, password FROM usuarios WHERE mail = $1', [req.body.mail]);   
  if(usersResult.rowCount === 0) 
  {
      return res.status(400).json({error: 'Usuario no encontrado'});
  }

const user = usersResult.rows[0];
// console.log('User', user);

const validPassword = await bcrypt.compare(req.body.password, user.password);


if (!validPassword) {
  console.log ("el pass de req.body.password es  =   " +req.body.password)
  console.log ("el pass   de  user.password es   =   " +user.password)
  return res.status(400).json({ error: 'Contraseña no válida' });
}

 // Crear el token  //aca cremos el token despues de saber q pass es valido
 const token = jwt.sign({
  name: user.name,  
  mail: user.mail
},process.env.TOKEN_SECRET);

  //esta es la variable TOKEN_SECRET q creamos arriba
    //esta variable token creada la pasamos como para el front
    // Crear el token

res.json({ error: null, data: `BIENVENIDO ${user.mail} Login exitoso `, token });
}
catch(err) {
  
  return res.status(400).json({ error: "falta ingresar password  " + err.message });

  
}
//aca devolvemos mensaje exitoso y el token 
});   //fin login
//////////////////////////////////////////////////////////////




































//POST REGISTRO memoria
router.post ('/register', async function  (req, res) { //hacemos la func asy
    //xq usamos abajo bcyrpt que es una fx q devuelve una promesa
  
    if (( req.body.mail==="")){
      res.status(400).json({ success: false, message: "falta ingresar mail"})
      return;
    }
    else if (( req.body.password==="")){
      res.status(400).json({ success: false, message: "falta ingresar password"})
      return;
    } //verificamos que el cuerpo del mail y pass no sea vacios
  
    if ( req.body.mail && req.body.name && req.body.password){
       if (/^\S+@\S+\.\S+$/.test(req.body.mail)===false){
        res.status(400).json({ success: false, message: "formato de amil no valido"})
        return   //controlamos el formato del mail
      }
  
      //me fijo si existe el usuario q quiero ingresar me fijo con el find si existe usuario
      //recibe funcion si cumple con la funcion lo devuelve y guarda en la var
      //si es null es xq no existe y lo agrego.  si es no null ya existe y mando error 
      const existeUser = usuarios.find((user) =>{
        return user.mail === req.body.mail;
      });
    if (existeUser) { 
        res.status(400).json({ success: false, message: "mail ya registrado"})
         return
    }
    
  // aca agregamos el encriptado
    const salt = await bcrypt.genSalt(10);
  
    const password = await bcrypt.hash(req.body.password, salt);   
    const newUser = 
    {     
    name: req.body.name,
    mail: req.body.mail,
    password: password  
    }
    //agrego al array usuarios con metodo push el nuevo usuario ingresado
  usuarios.push(newUser);
  res.json({ success: true, newUser, usuarios})
  
    }
     //si el campo name esta vacio mando error
    else if (( req.body.name==="")){
      res.status(400).json({ success: false, message: "falta nombre"})
      return; 
    }
      //si el campo mail esta vacio mando error
    else if (( req.body.mail==="")){
      res.status(400).json({ success: false, message: "falta mail"})
      return;
    }
     //si el campo password esta vacio mando error
    else if (( req.body.password==="")){
      res.status(400).json({ success: false, message: "falta password"})
      return;
    }
  
    else{
      res.status(400).json({ success: false, message: "falta datos"})
      return;
    }
    }); //fin register
//////////////////////////////////////////////////////////////






// //POST LOGIN
// router.post('/login', async function (req, res){
//     if (( req.body.mail===""))
//     {
//         res.status(400).json({ success: false, message: "falta ingresar mail"})
//         return;
//     }
//     else if (( req.body.password===""))
//     {
//         res.status(400).json({ success: false, message: "falta ingresar password"})
//     return;
//     } //verificamos que el cuerpo del mail y pass no sea vacios

//     const user = usuarios.find((user) =>user.mail===req.body.mail);
//     if(!user) 
//     {
//         return res.status(400).json({error: 'Usuario no encontrado'});
//     }

//     const validPassword = await bcrypt.compare(req.body.password, user.password);  //metodo compare la encrip del body con el del user.passw del find de arriba
//   if (!validPassword) {
//     return res.status(400).json({ error: 'Contraseña incorrecta' });
//   }

//    // Crear el token  //aca cremos el token despues de saber q pass es valido
//    const token = jwt.sign({
//     name: user.name,  
//     mail: user.mail
//   }, TOKEN_SECRET);  //esta es la variable TOKEN_SECRET q creamos arriba
//       //esta variable token creada la pasamos como para el front
//       // Crear el token
  
//   res.json({ error: null, data: `BIENVENIDO ${user.mail} Login exitoso `, token });
  
//   //aca devolvemos mensaje exitoso y el token 
// });   //fin login
// //////////////////////////////////////////////////////////////

//creamos un get q liste usuarios sin autent
router.get('/listaUserSinLogin',  (req, res) =>{
    res.json({error: null, data: `/listaUserSinLogin `, usuarios}) //aca devolvemos la lista de usuarios 1= con el de arriba es el veriytoken  
}); //fin GET devolvemos la lista de usuarios a todos los users
///////////////////////////////////////////////////////////// / 

//creamos un get q liste usuarios con autent.
router.get('/listaUserConLogin', verifyToken, (req, res) =>{
  res.json({error: null, data: `/listaUserConLogin `, usuarios}) //aca devolvemos la lista de usuarios 1= con el de arriba es el veriytoken  
}); //fin GET devolvemos la lista de usuarios solo autenitifcados
////////////////////////////////////////////////////////////// 


router.get('/*', (req, res) =>{  
  return res.send("server corriendo en /auth") 
  }); //FIN GET  
  //////////////////////////////////////////////////////////////




















// //new3 aca va a devolver los articulos en memoria
// router.get('/articulos', function(req, res){
//   res.json({
//     articulos:articulos
//   });
// });
















//declaramos arrays
const usuarios = [
    
  ]; //array de usuer 
  ///////////////////////////////////////////////

 


//exportamos el modulo router para usarlo desde index 
module.exports = router;











//este get devuelve los artuclos de la lista en memoria
//se actualiza arriba para q se conecta a la d
// router.get('/articulos', function(req, res){
//   res.json({
//     articulos:articulos
//   });
// });







// // //creamos un router q no hace nada para saber q esta conectado
// router.get('/ping', (req, res) =>{
// res.json({success: true}); 
// }); //FIN GET    
//   //////////////////////////////////////////////////////////////


//creamos un get q liste articlos sin autent
// router.get('/listaArticulos',  (req, res) =>{
//   res.json({error: null, data: `/listaArticulos`, listaDeArticulos}) //aca devolvemos la lista de usuarios 1= con el de arriba es el veriytoken  
// }); //fin GET devolvemos la lista de arti a todos los users
// ////////////////////////////////////////////////////////////// 







// //////////////////////////////////////////////////////////////
// //POST ingreso articulos en memoria
// router.post('/ingresarArticulo', (req, res)=>{

//   const id = req.body.id;
//   const nombre = req.body.nombre;
//   const descripcion = req.body.descripcion;
//   const categoria =req.body.categoria;
//   const imagen =req.body.imagen;
//   const precio =req.body.precio;
//   const stock =req.body.stocK;
//   const estado =req.body.estado;
  
//   const nuevoArticulo = { 
//   id: id,  
//   nombre: nombre,
//   descripcion: descripcion, 
//   categoria: categoria, 
//   imagen: imagen, 
//   precio: precio, 
//   stock: stock, 
//   estado: estado,
//   } 
//   articulos.push(nuevoArticulo);
//   res.json({ success: true, nuevoArticulo, articulos})
//   console.log(`\n nro id es ${id}`+ `\n nombre art es ${nombre}`);
  
//   });//fin post ingresar art.  devolvermos art nuevo y lista artoculos
//   ////////////////////////////////////////////////////////////// 