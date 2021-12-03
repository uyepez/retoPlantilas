var express = require('express')
const handlebars = require("express-handlebars")

var app = express();
const Productos = require('./productos.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Handlebars
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/views_handlebars/layouts",
    partialsDir: __dirname + "/views/views_handlebars/partials",
});

app.engine(
    "handlebars",
    handlebars.engine()
)

app.set('view engine', 'handlebars');
app.set("views", "./views/views_handlebars");

const listaProductos = new Productos()

const listaImagenes = [
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/019_-_Star-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/006_-_Present-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/025_-_Mince_Pie-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/018_-_Candle-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/007_-_Present-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/015_-_Stocking-128.png" },
    { foto: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/59/026_-_Baubles-128.png" }
]


//index vista de formulario
app.get('/', function (req, res) {
    const randomElement = listaImagenes[Math.floor(Math.random() * listaImagenes.length)];
    res.render('home', {
        foto: randomElement.foto,
        mensaje: ''
    })
})


//vista de lista
app.post('/productos', function (req, res) {
    console.log("body", req.body);
    let nuevoProducto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: 0
    }
    const ultimoProducto = listaProductos.nuevo(nuevoProducto);
    const randomElement = listaImagenes[Math.floor(Math.random() * listaImagenes.length)];

    res.render('home', {
        foto: randomElement.foto,
        mensaje: "Producto almacenado correctamente."
    })
})

app.get('/lista', function (req, res) {
    //listaProductos=[]

    res.render('lista', {
        lista: listaProductos.productos,
        totalProductos: listaProductos.length
    })
})

//listen 
app.listen(3000)
console.log('3000 es mi puerto');
