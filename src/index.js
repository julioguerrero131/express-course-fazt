// ROUTING

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   const read = fs.createReadStream("./static/index.html");
//   read.pipe(res);
// });

// server.listen(3000);
// console.log(`server on port ${3000}`);

const express = require("express");
const morgan = require('morgan');
const path = require('path');

const app = express();

// SETTINGS
app.set('case sensitive routing', true);
// configuracion reservada: las rutas distinguen entre mayus y minus
// no se usa mucho
app.set('appName', 'Express Course');
app.set('port', 3000)
// establece un nombre de variable y un valor
// se lo llama con get

//app.use('/public', express.static('./static')); // suele llamarse public tambien (la carpeta)
// los archivos de la carpeta se cargan al inicio
// se puede acceder desde el navegador en estos archivos
// cualquier ruta con nombre parecido se opaca por este middleware
// (depende del orden)
// para tener acceso a ambos, se le da una direccion de ruta 
// siempre se considera que las carpetas estan en la ruta principal del proyecto
// -> Se necesita el modulo PATH
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  //   res.sendFile("./static/index.html", {
  //     root: __dirname // indica la ruta completa
  //   });
  res.send("Hello World");
});

app.get('/note.txt', (req, res) => {
  res.send('no soy un archivo');
});

// las rutas no distinguen entre mayus y minus
app.get('/userName', (req, res) => {
  res.send('user name route');
});

// METODOS HTTP

// PETICIONES GET
// el cliente pide para obtener algo del servidor

// PETICIONES POST
// El cliente busca guardar algo en el servidor

// PETICIONES PUT
// El cliente busca actualizar un dato completo en el servidor

// PETICIONES DELETE
// El cliente busca eliminar un dato del servidor

// PETICIONES PATCH
// Similar a put, pero busca actualizar una parte de un dato

// estas peticiones se las conoce como: VERBOS HTTP
// son las formas de comunicacion de http

app.get("/products", (req, res) => {
  // validate data
  // query a database
  // process data
  res.send("lista de productos");
});

app.post("/products", (req, res) => {
  res.send("creando productos");
});

app.put("/products", (req, res) => {
  res.send("actualizando producto");
});

app.delete("/products", (req, res) => {
  res.send("eliminando un producto");
});

app.patch("/products", (req, res) => {
  res.send("actualizando una parte del producto");
});

// enviar otro tipo de archivos
app.get("/miarchivo", (req, res) => {
  res.sendFile("./javascript-logo.png", {
    root: __dirname, // es un objeto global
  });
});

app.get("/user", (req, res) => {
  res.json({
    name: "julio",
    last_name: "guerrero",
    edad: 30,
    points: [1, 2, 3],
    address: {
      city: "new york",
      street: "street 12",
    },
  });
});

// REQUEST BODY

app.use(express.text()); // permite a express interpretar texto
app.use(express.json()); // permite a express interpretar json
app.use(express.urlencoded({ extended: false })); // permite a express interpretar datos de un formulario
// se interpretan los datos y se guardan en un json

app.post("/userpost", (req, res) => {
  console.log(req.body); // body: contenido de la peticion del cliente
  res.send("nuevo usuario creado");
});

// REQUEST PARAMS
// son parametros que van en la url

app.get("/hello/:name", (req, res) => {
  // todo parametro es un string
  console.log(req.params.name);
  console.log(req.query);
  console.log(req.query.age);
  res.send(`hello ${req.params.name}`);
});

// METODO ALL
// indica que funciona con cualquier metodo http
app.all("/info", (req, res) => {
  res.send("server info");
});

// QUERYS
// se envia datos adicionales del cliente al servidor
// Ejemplos: // http://localhost:3000/hello/julio?x=20
// http://localhost:3000/hello/julio?age=20&lastname=guerrero

app.get("/search", (req, res) => {
  console.log(req.query);
  if (req.query.q === "javascript books") {
    // http://localhost:3000/search?q=javascript%20books
    res.send("lista de libros de javascript");
  } else {
    res.send("pagina normal"); // http://localhost:3000/search?user=julio&user=fazt
    // cuando una misma variable guarda varios valores, lo hace en un arreglo
  }
});

app.get("/add/:x/:y", (req, res) => {
  const { x, y } = req.params;
  res.send(`Result: ${parseInt(x) + parseInt(y)}`);
});

app.get("/users/:username/photo", (req, res) => {
  // logica para procesarlo
  if (req.params.username === "julio") {
    return res.sendFile("./javascript-logo.png", {
      root: __dirname,
    });
  }

  res.send("El usuario no tiene acceso");
});

app.get("/name/:name/age/:age", (req, res) => {
  console.log(req.params);
  res.send(`El usuario ${req.params.name} tiene ${req.params.age} años.`);
});

// MIDDLEWARES
// cualquier ruta va a pasar por esta funcion
// Se aplican a todas las rutas que le siguen
// El orden de las funciones importa

app.use((req, res, next) => { // logger
  console.log(`Route: ${req.url} Method: ${req.method}`);

  next(); // indicamos a la pagina que siga con sus demas tareas
});

app.all('/about', (req, res) => {
  res.send('about page');
});

app.use(morgan('dev'));

app.get('/profile', (req, res) => {
  res.send('profile page');
});

app.use((req, res, next) => { // isAuthorized
  if (req.query.login === 'julio@mail.com') { // http://localhost:3000/dashboard?login=julio@mail.com
    next();
  } else {
    res.send('no autorizado');
  }
});

app.get('/dashboard', (req, res) => {
  res.send('Dashboard Page');
});

// para saber sobre codigos de estado: 304 http status code
// los codigos los pone express la mayoria de las veces solo
// Podemos enviar codigos manualmente

app.get("/isAlive", (req, res) => {
  res.sendStatus(204);
});

app.use((req, res) => {
  res.status(404).send("Error 404: no existe la pagina");
});

app.listen(app.get('port'));
console.log(`server ${app.get('appName')} on port ${app.get('port')}`);
