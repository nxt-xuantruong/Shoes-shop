import Category from "../../components/Category/Category";
import Slider from "../../components/Slider/Slider";

import "./Home.css";

const homeCategory = [
  {
    title: "Giày NIKE",
    children: ["Nike Air Force 1", "Jordan 4", "Nike Blazer", "Nike SB Dunk"],
  },
  {
    title: "GIÀY ADIDAS",
    children: ["ULTRA BOOST", "ADIDAS FORUM", "AIR FEAR OF GOD", "NIKE SACAI"],
  },
  {
    title: "GIÀY MLB",
    children: ["BIGBALL CHUNKY", "CHUNKY LINER", "MLB MULE"],
  },
  {
    title: "JORDAN",
    children: ["JORDAN 1 HIGH", "JORDAN 3", "JORDAN 1 LOW", "JORDAN 4"],
  },
];

function Home() {
  return (
    <div className="home">
      <Slider />
      {homeCategory.map((item, index) => {
        return <Category key={index} data={item} />;
      })}
      <div className="homeAbout">
        <div className="left">
          <p className="subHeader">Về chúng tôi</p>
          <h2>Roll Sneaker</h2>
          <p>
            Tiền nhiệm là Shopgiayreplica.com™ - Shop Uy tín lâu năm chuyên cung
            cấp giày thể thao sneaker nam, nữ hàng Replica 1:1 - Like Auth với
            chất lượng khác biệt so với thị trường và giá tốt nhất. Shop có sẵn
            hàng tại 2 cơ sở Hà Nội, tp HCM. Giao hàng nhanh toàn quốc, đổi trả,
            bảo hành linh hoạt.
          </p>
          <p>
            Bạn không đủ hầu bao để mua 1 đôi Chính Hãng? Hay bạn order quá lâu
            cũng như size của mình đã Sold Out? Bạn đang cần tìm các mẫu Sneaker
            với mong muốn chất lượng, detail chuẩn hàng Auth? Roll Sneaker sẽ
            giải quyết hết thắc mắc của bạn với chất lượng cực kỳ khác biệt, đa
            dạng mẫu mã, có sẵn hàng. Liên tục cập nhật, update, fix các phiên
            bản tiệm cận hàng Auth nhất. Các bạn có thể yên tâm lựa chọn trong
            một thị trường rất hỗn loạn về chất lượng, cũng như định nghĩa chuẩn
            về Giày Replica - Like Auth.
          </p>
        </div>
        <div className="right">
          <img
            src="https://shopgiayreplica.com/wp-content/uploads/2024/03/roll-sneaker-avarta.jpg"
            alt="homeAboutImg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
