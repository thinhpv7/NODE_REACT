import React, { Component } from 'react';

class Products extends Component {
    render() {
        return (
            //mỗi một sản phẩm chiếm 4 cột
            <div className="col-2">
                <div className="card text-left">
                    <img className="card-img-top" src={this.props.image} alt = "Hinh anh"/>
                    <div className="card-body">
                    <b className="card-title float-left">{this.props.product_name}</b>
                    <i className="card-title float-right">{this.props.product_price}</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;