require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns')
const bodyParser = require('body-parser');
const { error } = require('console');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// Your first API endpoint
let counter = 0;
let uri = ''

app.post('/api/shorturl', function(req, res) {
  let url = new URL(req.body.url);
  let resObj = {
    original_url: url.href,
    short_url: counter
  };
  if(url.protocol != 'https:'){
    resObj = {error:'invalid url'}
    console.log(url.href);
  }
  res.json(resObj);
  counter += 1;
  uri = url.href;
  console.log(resObj);
});

app.get(`/api/shorturl/:${counter}`,function (req,res) {
  res.redirect(uri);
  console.log(`${req.url} Will redirect to : ${uri}`);
});
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
