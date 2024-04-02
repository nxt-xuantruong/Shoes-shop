import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import { deleteAdmin } from "../../Config/store/admin";
import { deleteUser } from "../../Config/store/users";
import { deleteProduct } from "../../Config/store/products";

import ModalForm from "../ModalForm/ModalForm";

import "./TabContent.css";

function TabContent({ tab }) {
  const dispatch = useDispatch();

  const adminAccount = useSelector((state) => state.admin.admins);
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders);

  const [openModal, setOpenModal] = useState(false);
  const [tabTitle, setTabTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteAdmin = (id) => {
    dispatch(deleteAdmin(id));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = (value) => {
    setOpenModal(value);
  };
  useEffect(() => {
    switch (tab) {
      case "accountUsers":
        setTabTitle("Danh sách khách hàng");
        setButtonTitle(null);
        break;
      case "accountAdmin":
        setTabTitle("Danh sách Admin");
        setButtonTitle("Tạo tài khoản");
        break;
      case "product":
        setTabTitle("Danh sách sản phẩm");
        setButtonTitle("Thêm sản phẩm");
        break;
      case "orders":
        setTabTitle("Danh sách đơn hàng");
        setButtonTitle(null);
        break;
      default:
        setTabTitle("Nội dung mặc định");
        break;
    }
  }, [tab]);
  const renderContent = () => {
    switch (tab) {
      case "orders":
        return (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Sản phẩm</th>
                <th>Tổng giá</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.customerInfo.fullName}</td>
                    <td>{order.customerInfo.address}</td>
                    <td>
                      {order.orderProduct.map((product, idx) => (
                        <div key={idx}>{product.name}</div>
                      ))}
                    </td>
                    <td>{order.orderTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      case "accountUsers":
        return (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      case "accountAdmin":
        return (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {adminAccount.map((admin, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td></td>
                    <td>
                      <button onClick={() => handleDeleteAdmin(admin.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      case "product":
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }
        return (
          <>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>category</th>
                  <th>slug</th>
                  <th>Image</th>
                  <th>Sản Phẩm</th>
                  <th>price</th>
                  <th>sale</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const productIndex = indexOfFirstItem + index + 1;
                  return (
                    <tr key={index}>
                      <td>{productIndex}</td>
                      <td>{product.category}</td>
                      <td>{product.slug}</td>
                      <td>
                        <img
                          width={80}
                          height={80}
                          alt="img"
                          src={product.img_thumbnail}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.sale}%</td>
                      <td>
                        <button onClick={() => handleEditProduct(product)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="btnTab">
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => setCurrentPage(number)}>
                  {number}
                </button>
              ))}
            </div>
          </>
        );
      default:
        return <div className="TabContent">Nội dung mặc định</div>;
    }
  };

  return (
    <div className="TabContent">
      <header>
        <p>{tabTitle}</p>
        <div className="search">
          <input type="text" placeholder="Tìm kiếm" />
          <button>Tìm kiếm</button>
        </div>
      </header>
      {buttonTitle && (
        <button onClick={() => setOpenModal(true)}>{buttonTitle}</button>
      )}
      {openModal && (
        <ModalForm
          tab={tab}
          closeModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}
      {renderContent()}
    </div>
  );
}

export default TabContent;
