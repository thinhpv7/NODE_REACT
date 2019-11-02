import React, { Component } from 'react';
import './App.css';
import HeadTitle from './HeadTitle';
import Product from './Product';
import axios from 'axios'
import AddProduct from './AddProduct';
// import DataProduct from "http://localhost:4000"

//get data from node js axios
const getProductData = () => 
   axios.get('/getdata01')
        .then((res) => res.data)

//add product
const addProductAction = (product_name, product_price, image) => {
    return axios.post('/add', {product_name, product_price, image})
    .then((resp)=> resp.data)
}

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      data : null,
      product_name: '',
      product_price: '',
      image: ''
    }
  }

  //lấy dữ liệu ngay khi lấy được từ backend
  componentWillMount() {
    if(this.state.data === null){
      getProductData().then((res) => {
        this.setState({
          data : res
        })
      })
    }
  }

  //print data
  printData = () => {
    if(this.state.data !== null){
      return this.state.data.map((value, key) =>{
        return (
          <Product
            key = {key}
            product_name = {value.product_name}
            product_price = {value.product_price}
            image = {value.image}
          />
        )
      })
    }
  }
  

  isChange = (event) => {
    var name  = event.target.name
    var value = event.target.value
    //console.log(name)
    //console.log(value)

    this.setState({
        [name] : value
    })
  }

  handleClick = () => {
      //console.log(JSON.stringify(this.state))
      var {product_name, product_price, image} = this.state
      var dataTemp = []
      //khởi tạo một đối tượng
      var item = {}
      item.product_name = product_name
      item.product_price = product_price
      item.image = image
      //tạo ra một mang trung gian lưu trữ dữ liệu
      dataTemp = this.state.data
      //console.log(dataTemp)
      if(item.product_name !== ''){
        dataTemp.push(item)
        //sau khi thêm mới cập nhật lại state
        this.setState({
          data: dataTemp
        })
      }
     
      addProductAction(product_name, product_price, image).then((response) => {
          console.log(response)
      })


  }

  render() {
    //console.log(this.state.data)
    return (
      <div className="App">
      <HeadTitle/>
      <AddProduct/>
      <div className = "container-fluid">
        <div className = "row">
        
          <div className = "col">
            <div className = "row">
              {this.printData()}
            </div>
          </div>

          <div className = "col-3">
          <div className="row">
                    <div>
                        <form>
                            {/* tên sản phẩm */}
                            <div className="form-group">
                            <label>Tên sản phẩm</label>
                            <input onChange = {(event) => this.isChange(event)} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Nhập tên sản phẩm" />
                            <small id="name_text" className="form-text text-muted">Nhập tên vào</small>
                            </div>
                            {/* giá sản phẩm */}
                            <div className="form-group">
                            <label>Gía sản phẩm</label>
                            <input onChange = {(event) => this.isChange(event)} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="price_text" placeholder="Nhập giá sản phẩm" />
                            <small id="price_text" className="form-text text-muted">Nhập giá vào</small>
                            </div>
                            {/* ảnh sản phẩm */}
                            <div className="form-group">
                            <label>Đường link ảnh sản phẩm</label>
                            <input onChange = {(event) => this.isChange(event)} type="text" className="form-control" name="image" id="image" aria-describedby="price_text" placeholder="Nhập giá sản phẩm" />
                            <small id="price_text" className="form-text text-muted">Nhập link ảnh vào</small>
                            </div>
                            {/* button submit */}
                            <button type="reset" onClick = {() => this.handleClick()} className="btn btn-block btn-info">Thêm mới</button>
                        </form> 
                    </div>
                </div>
          </div>
        </div>
      </div>
        
      </div>
    );
  }
}

export default App;
