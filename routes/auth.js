//AUTH DE PROYECTOBACK
const jwt = require('jsonwebtoken'); //instalamos para token                                  
const { verifyToken} = require('../middlewares/jwt-validate')
//reqeremimos el TOKKEN_SECRET para traerlo del archivo del middleware 
//traemos el valor del TOKKEN_SECRET
//tbm traemos en la fx verifytoken
const express = require('express');  
const bcrypt = require('bcrypt');
const router = express.Router();
const {Pool} = require ('pg');
// const db = require('../db');

// const JSONTransport = require('nodemailer/lib/json-transport');

//EMPIEZAN LOS MANEJADORES de ESTE ROUTER router.verbo/login o /auth



//POST LOGIN


router.post('/login', async function (req, res){
  // if (( req.body.mail===""))
  // {
  //     res.status(400).json({ success: false, message: "falta ingresar mail"})
  //     return;
  // }
  // else if (( req.body.password===""))
  // {
  //     res.status(400).json({ success: false, message: "falta ingresar password"})
  // return;
  // } //verificamos que el cuerpo del mail y pass no sea vacios
  
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT 
  });
  
    const usersResult = await pool.query('SELECT mail, password FROM usuarios WHERE mail = $1', [req.body.mail]);
      
  if(usersResult.rowCount === 0) 
  {
      return res.status(400).json({error: 'Usuario no encontrado'});
  }
  const user = usersResult.rows[0];
  console.log('user', user);

  try {
  const validPassword = await bcrypt.compare(req.body.password, user.password);  //metodo compare la encrip del body con el del user.passw del find de arriba
if (!validPassword) {
  return res.status(400).json({ error: 'Contraseña incorrecta' });
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
  return res.status(400).json({ error: err.message });
}
//aca devolvemos mensaje exitoso y el token 
});   //fin login
//////////////////////////////////////////////////////////////






























//creamos un router q no hace nada para saber q esta conectado////
router.get('/', (req, res) =>{  
  res.json(
    {articulos:articulos, 
      success: true}
    );
  }); //FIN GET  
  //////////////////////////////////////////////////////////////


//agregar un articulo//////////////////////////////////////////
//esta ruta esta en /auth/  ver de sacarla /art/
router.post('/agregararticulo', async (request, response) =>{
//lo primero que hacemos es valdar los datos
// si se tienen muchos textbox hacer un if x c/u

try {
if (request.body.nombre === null || request.body.nombre === undefined) {
  return response.send ({
    success: false, 
    error: 'Falta ingresar nombre'
  });
}
const nombre =request.body.nombre;
const descripcion = request.body.descripcion;
const categoria = request.body.categoria;
const imagen = request.body.imagen;
const precio = request.body.precio;
const stock = request.body.stock;
const estado = request.body.estado;
const id_proveedorEnArticulos = request.body.id_proveedorEnArticulos;
const id_categoriaEnArticulos = request.body. id_categoriaEnArticulos;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT 
});

//desde node usamos met query del pool para todos los verbos
const res = await pool.query ('iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos]);

response.send ({
  success: true, 
    articulo: {
      nombre: nombre,      
      descripcion: descripcion,
      categoria:categoria,
      imagen:imagen,
      precio: precio,
      stock: stock,
      estado:estado,
      id_proveedorEnArticulos: id_proveedorEnArticulos,
      id_categoriaEnArticulos: id_categoriaEnArticulos
    }
});
}

catch (ex){  
  return response.send ({
    success:false,
    error: 'an exception was throw:' + (ex)        
    });
    
  }
}); //FIN agregar un articulo///////////////////////////////////
 ////////////////////////////////////////////////////////////// 


//borrar un articulos/////////////////////////////////////////
router.delete('/:articuloId', (request, response) =>{
  response.send ({
    deletedArticulo: {
      name: 'ruta en construccion borrar art, id: ${request.param.articuloId}'
    }
  });

}); //fin borrar un articulos///////////////////////////////////
 //////////////////////////////////////////////////////////////

//actualiza un articulo/////////////////////////////////////////
router.put('/:articuloId', (request, response) =>{
  response.send ({
    updateArticulo: {
      name: 'ruta en construccion update art, id: ${request.param.articuloId}'
    }
  });
});//fin actiazar articulos/////////////////////////////
//////////////////////////////////////////////////////////////








//POST REGISTRO
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


//new3 aca va a devolver los articulos
router.get('/articulos', function(req, res){
  res.json({
    articulos:articulos
  });
});

//declaramos arrays
const usuarios = [
    
  ]; //array de usuer 
  ///////////////////////////////////////////////

const articulos = [ 
    {
        id: "001",
    nombre: "calefon",
    descripcion: "calefon 10li",
    categoria: "electrodomisticos",
    imagen: "yyy",
    precio: "15000",
    estado: "ingresado"
    },
    {
        id: "002",
    nombre: "linerna",
    descripcion: "linterna luz",
    categoria: "iluminacion",
    imagen: "xxx",
    precio: "1200",
    estado: "ingresado"
    },                            
    {
        id: "003",
    nombre: "calculadora",
    descripcion: "calc mesa",
    categoria: "oficina",
    imagen: "xxx",
    precio: "1200",
    estado: "ingresado"
    }
];//array de articulos 


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