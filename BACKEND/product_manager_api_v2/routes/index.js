var express = require('express');
var router = express.Router();

//kết nối với postpresql
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '1234',
  port: 5432,
})



/* GET home page. */
router.get('/', function(req, res, next) {
});

// api get data from postgreSql 
router.get('/getdata01', function(req, res, next) {
  //get data
  pool.query('SELECT * FROM product_info', (err, response) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    //console.log(res.rows)
    if(err){
      console.log(err)
    }else{
      //dùng để frontend có thể lấy dữ liệu
      res.send(response.rows)
    }
    //pool.end()
  })
  
});

router.get('/add', function(req, res, next){
  res.render('add', {})
})

router.post('/add', function(req, res, next){
  //cách sửa lỗi CORS bằng cách sử dụng proxy

  var product_name = req.body.product_name, product_price = req.body.product_price, image = req.body.image
  res.send("1")

  pool.query("INSERT INTO product_info (product_name, product_price, image) values ($1, $2, $3)", [product_name, product_price, image], (error, response) => {
    if(err){
      response.send(error)
    }else{
      response.send(1)
    }
  })

})


module.exports = router;
