const express = require('express');
const router = express.Router();
const db = require('../db'); //creao el pool en carp db y traigo la cte.


//creamos un router q no hace nada para saber q esta conectado////
router.get('/', (req, res) =>{  
    return res.send("toy en /articlos") 
    }); //FIN GET  
    //////////////////////////////////////////////////////////////

   
    
//agregar un articulo//////////////////////////////////////////
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
    
    
    //desde node usamos met query del pool para todos los verbos
    const res = await db.query ('iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [nombre, descripcion, categoria, imagen, precio, stock, estado, id_proveedorEnArticulos, id_categoriaEnArticulos]);
    
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
    
    //creamos un router q no hace nada para saber q esta conectado////
router.get('/*', (req, res) =>{  
  return res.send("server corriendo en /art") 
  }); //FIN GET  
  //////////////////////////////////////////////////////////////


    
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