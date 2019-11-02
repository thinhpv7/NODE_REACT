import React, { Component } from 'react';

class HeadTitle extends Component {
    render() {
        return (
            // tạo tiêu đề
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Danh sách sản phẩm</h1>
                    <p className="lead">Sử dụng react js lấy dữ liệu từ node js</p>
                    <hr className="my-2" />
                </div>
            </div>
        );
    }
}

export default HeadTitle;