import Header from "../../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
export default function LayoutAccount({ children }) {
  return (
    <div id="warpper" className="nav-fixed">
      <Header />
      <div
        className="content container"
        style={{ minHeight: "300px", marginTop: "20px" }}
      >
        <div id="page-body" className="d-flex">
          <Sidebar />
          <div id="wp-content" className="ps-0">{children}</div>
        </div>
      </div>
    </div>
  );
}