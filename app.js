const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');
const http = require('http');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

db.func();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

var key = fs.readFileSync('key.pem');
var cert = fs.readFileSync('cert.pem');
var options = {
  key: key,
  cert: cert
};

/*db.execute('SELECT * FROM products')
.then(result=>{
    console.log(result[0], result[1]);
})
.catch(err=>{
    console.log(err);
});*/

db.sequelize.sync()    //this syncs model to the database by initializing the table or relation in the database according to model definition
.then(result=>{
  console.log("required database table and relations initialized");
})
.catch(err=>{
  console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/*const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>This is random testing!</h1>')
  })

server.listen(8080,()=>console.log("Server is listening on port 8080"))*/

//const httpServer = http.createServer();

//httpServer.listen(3000, ()=>{console.log("Print this");})

app.listen(3000,()=>console.log("http server is running"));

const httpsServer = https.createServer(options,app);


httpsServer.listen(8000,()=>console.log("https server is running"))
