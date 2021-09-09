--correr en la 1era etapa
-- drop DATABASE telsitur;
-- CREATE DATABASE telsitur
CREATE TABLE usuarios (
  id_usuario SERIAL NOT NULL PRIMARY KEY,
  mail VARCHAR(200) NOT NULL UNIQUE,
  nombre VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT 'true'
);
CREATE TABLE categorias (
  id_categoria SERIAL NOT NULL UNIQUE PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT 'true'
);
CREATE TABLE proveedores (
  id_proveedor SERIAL NOT NULL UNIQUE PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  contacto VARCHAR(200) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT 'true'
);
CREATE TABLE articulos (
  id_articulo SERIAL NOT NULL UNIQUE PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  categoria VARCHAR(200) NOT NULL,
  imagen VARCHAR(200) NOT NULL,
  precio INTEGER NOT NULL,
  stock INTEGER,
  estado BOOLEAN NOT NULL DEFAULT 'true',
  id_proveedorEnArticulos INTEGER NOT NULL references proveedores (id_proveedor),
  id_categoriaEnArticulos INTEGER NOT NULL references categorias (id_categoria)
);
--revisar en productos xq hay categoria y id de categoria
-- ALTER TABLE articulos ADD CONSTRAINT articulos_id_proveedorEnarticulos_proveedores_id_proveedor FOREIGN KEY (id_proveedorEnArticulos) REFERENCES proveedores (id_provisionid_proveedor);
-- ALTER TABLE articulos ADD CONSTRAINT articulos_id_categoriaEnarticulos_categorias_id_categoria FOREIGN KEY (id_categoriaEnArticulos) REFERENCES categorias(id_categoria);
--scrpit ingreso de datos
--inserts empleado
INSERT INTO
  usuarios (mail, nombre, password)
VALUES
  ('juan.sequeira@gmail.com', 'juan', '1234');
INSERT INTO
  usuarios
vALUES
  ('1@1.com', 'pablo', '1234');
--inserts prov
INSERT INTO
  proveedores (nombre, contacto)
VALUES
  ('herracor', 'pablo 099454545');
INSERT INTO
  proveedores (nombre, contacto)
VALUES
  ('hierros', 'pepe 094555888');
INSERT INTO
  proveedores (nombre, contacto)
VALUES
  ('palaso', 'daniel 095454444');
-- ok
  --inserts cat
INSERT INTO
  categorias (nombre)
VALUES
  ('ferreeteria');
INSERT INTO
  categorias (nombre)
VALUES
  ('sannitaria');
INSERT INTO
  categorias (nombre)
VALUES
  ('barrraca');
INSERT INTO
  categorias (nombre)
VALUES
  ('varrios');
-- ok
  --inserts prod
  -- iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, id_proveedorEnArticulos, id_categoriaEnArticulos)
  -- VALUES ('pala','pala de 45 cm','ferreteria','c:/',25000, 100,'1','1');
  -- iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, id_proveedorEnArticulos, id_categoriaEnArticulos)
  -- VALUES ('linterna','linterna redonda','ferreteria','c:/', 10000,50,'2','1');
  -- iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, id_proveedorEnArticulos, id_categoriaEnArticulos)
  -- VALUES ('brujula','de mapas','varios','c:/',100000,10,'2','4');
  -- iNSERT INTO articulos(nombre, descripcion, categoria, imagen, precio, stock, id_proveedorEnArticulos, id_categoriaEnArticulos)
  -- VALUES ('caño redondo','poliestileno','sanitaria','c:/',50000,550,'3','2');
  --ok
  --fin correr en 3da etapa
  --select * from empleados