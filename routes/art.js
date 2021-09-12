const express = require('express');
const router = express.Router();
const db = require('../db'); //creao el pool en carp db y traigo la cte.
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest:'uploads/' })
const cors= require('cors');
// const { json } = require('body-parser');
// const userRoutes = require('../');
// router.use (bodyParser.urlencoded({ extended: false})) //vwe si no es true
// router.use (bodyParser.json())




router.use (express.urlencoded({ extended: false})) //vwe si no es true
router.use (express.json())
router.use (express.static(path.join(__dirname, '/app/upload')));




router.get('/pug',(req,res) =>{
  res.render('index', {titulo: 'listado de articulos'})
});

//creamos un router q no hace nada para saber q esta conectado////
router.get('/', (req, res) =>{  
    return res.send("toy en /art") 
    }); //FIN GET  
    //////////////////////////////////////////////////////////////

   
    
//agregar un articulo//////////////////////////////////////////
router.post('/agregararticulo', uploadMiddleware.single('imagen'), async (request, response) =>{
  try {          
    
                    //lo primero que hacemos es valdar los datos
                    // si se tienen muchos textbox hacer un if x c/u    
    if (request.body.nombre === null || request.body.nombre === undefined) {
      return response.send ({
        success: false, 
        error: 'Falta ingresar nombre'
      });
    }
    const nombre =request.body.nombre;
    const descripcion = request.body.descripcion;
    const categoria = request.body.categoria;
    const imagen = request.file.filename;
    const precio = request.body.precio;
    const stock = request.body.stock;
    const estado = request.body.estado;
    const id_proveedorEnArticulos = request.body.id_proveedorEnArticulos;
    const id_categoriaEnArticulos = request.body. id_categoriaEnArticulos;
    
    
    //desde node usamos met query del pool para todos los verbos
    const res = await db.query ('iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos]);
    console.log (request.file)
    
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
    



     // listar un articulos/////////////////////////////////////////
    router.get('/ListarARticulos', async(request, response) =>{
      try{
        const articulosDB = await db.query ('select * from articulos');
        const articulos = articulosDB.rows               
              console.log (articulos)
              return response.send ({
                success: true,
                articulos
              })
            }
      
      catch (ex){
      return response.send ({
        success: false,
        error:'exception: ' + JSON.stringify(ex)
      })
    }  
    
    }); //fin borrar un articulos///////////////////////////////////
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
    
//     //creamos un router q no hace nada para saber q esta conectado////
// router.get('/*', (req, res) =>{  
//   return res.send("la pagina solicitada no existe /art") 
//   }); //FIN GET  
//   //////////////////////////////////////////////////////////////


    
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
      }                           
     
  ];//array de articulos
    
    
    
    
    
    
    
    module.exports = router;