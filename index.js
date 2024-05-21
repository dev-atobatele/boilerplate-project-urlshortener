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
app.post('/api/shorturl', function(req, res) {
  let url = new URL(req.body.url);
  console.log(url.href)
  let resObj = {
    original_url: url.href,
    short_url:counter
  };
  if(url.protocol != 'https:'){resObj = {error:'invalid url'}}
  console.log(resObj)
  res.json(resObj);
  counter += 1;
});
/*app.get('api/shorturl',function (req,res) {
  
})*/
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
