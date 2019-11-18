var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var app = express();
var dataFetched = false;
var dataDeleted = false;
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8080;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var data;

app.use('/styles', express.static('styles'));

app.get('/',function(req, res){
  res.render('post');
});


app.get('/get',function(req, res){
  axios.get('https://my-fashion-catalog.herokuapp.com/api/catalog').then((res) => {
  data = [];
  // console.log(`statusCode: ${res.statusCode}`);
  // console.log("Check!!!!!!!!!!",res.data);
  res.data.forEach(function(obj){
    data.push(obj);
  });

  dataFetched = true;
  })
  .catch((error) => {
  console.error(error);
  });
  if(dataFetched === true){
    dataFetched = false;
    res.render('get', {data: data});
  }
});

app.get('/delete',function(req, res){
  console.log("I came here!!!");
  axios.get('https://my-fashion-catalog.herokuapp.com/api/catalog').then((res) => {
  data = [];
  // console.log(`statusCode: ${res.statusCode}`);
  // console.log("Check!!!!!!!!!!",res.data);
  res.data.forEach(function(obj){
    data.push(obj);
  });

  dataFetched = true;
  })
  .catch((error) => {
  console.error(error);
  });
  if(dataFetched === true){
    dataFetched = false;
    res.render('delete', {data: data});
  }
});

app.get('/delete/:id', function(req, res){
  var id = req.params.id;
  var url = 'https://my-fashion-catalog.herokuapp.com/api/deleteFromCatalog/' + id;
  axios.delete(url).then((res) => {
  console.log("Deleted!!");
  dataDeleted = true;
  })

  if(dataDeleted === true){
    res.redirect('/delete');
  }
});

app.post('/', urlencodedParser, function(req, res){
  var rb = req.body;
  axios.post('https://my-fashion-catalog.herokuapp.com/api/addToCatalog', {
  name: rb.name,
  brand: rb.brand,
  description :rb.description,
  material: rb.material,
  price: rb.price,
  colours: rb.colours,
  })
  .then((res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(res);
  })
  .catch((error) => {
  console.error(error);
})
res.render('post');
});

app.listen(PORT, function(){
  console.log("listening on port", PORT);
});
