import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import orderItemService from "../../services/orderItemService";
import orderService from "../../services/orderService";
import productService from "../../services/productService";

export default function UorderDetial() {
    const { id } = useParams();
    const [order, setOrder] = useState({})
    const [orderItems, setOrderITems] = useState([])
    const [product, setProduct] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        orderService.get(id).then((response) => {
            if (response.data) {
                setOrder(response.data );
            }
        });
        orderItemService.gets().then((response) => {
            if (response.data) {
                setOrderITems(response.data.results);
            }
        });
    }, [id])
    useEffect(() => {
        if (order.id && orderItems.length > 0) {
            let result = orderItems.filter(item => item.order === order.id);
            setData(result);
        }
    }, [order, orderItems]);
    useEffect(() => {
    let idProduct = data.map((value) => value.product);
    const uniqueSet = new Set(idProduct);
    idProduct = Array.from(uniqueSet);

    // Tạo mảng promises cho các lời gọi API
    const promises = idProduct.map(p => productService.get(p));

    // Sử dụng Promise.all để chờ tất cả các lời gọi API hoàn thành
    Promise.all(promises)
    .then(responses => {
        // Lấy dữ liệu từ các responses và gán vào mảng products
        const products = responses.map(response => response.data);
        setProduct(products);
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });
    }, [data]);
    const totalPrice = data.reduce((total, item) => {
        const itemPrice =item.price  * item.quantity;
        return total + itemPrice;
    }, 0);
    return (
        <div id="content" className="container-fluid" style={{width:'70%'}}>
            <div className="card">
                <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Chi tiết đơn hàng</h5>
                </div>
                <div className="card-body">
                    <div className="info" style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div className="info-left">
                            <p>Tên khách hàng: {order.name}</p>
                            <p>Email: {order.email}</p>                            
                            <p>Phone: {order.phone}</p>
                            <p>Adress: {order.address}</p>
                        </div>
                        <div className="info-right">
                            <p>Ngày đặt hàng: {order.date}</p>
                            <p>Tình trạng: {order.paid===true ? "Đã thanh toán" : "Chưa thanh toán"}</p>                            
                            <p>Note: {order.note}</p>
                        </div>
                    </div>
                    <table className="table table-striped table-checkall">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Size</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => {
                            return (
                                <tr key={index}>
                                <td>{index +1}</td>
                                    <td>
                                        <img
                                            alt="ảnh"
                                            src={product.find(p => p.id === item.product)?.thumbnail}
                                            style={{width: '100px', height: '100px'}}
                                        />
                                    </td>
                                <td>{product.find(p=> p.id === item.product)?.name}</td>
                                <td>{item.size}</td>
                                <td>
                                    {Number(item.price).toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                    })}
                                </td>
                                <td>{item.quantity}</td>
                                    
                                    
                                </tr>
                            );
                            })
                        ) : (
                            <h5 style={{ color: "red", marginTop: "10px" }}>
                            Không có đơn hàng
                            </h5>
                        )}
                        </tbody>
                        <tfoot>
                            <tr className="order-total">
                                <td colSpan={4} style={{textAlign:"right"}}> Tổng đơn hàng:</td>
                                <td colSpan={2}
                                    style={{ textAlign: "center" }}>
                                    {
                                        Number(
                                            totalPrice).toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                        })
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}