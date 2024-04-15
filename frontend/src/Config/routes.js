// layouts
import SidebarLayout from "../Layouts/SidebarLayout/SidebarLayout";
import LayoutaAdmin from "../Layouts/AdminLayout/Admin";

// Pages
import Home from "../Page/Home/Home";
import Cart from "../Page/Cart/Cart";
import CategoryDetail from "../Page/CategoryDetail/CategoryDetail";
import ProductDetail from "../Page/ProductDetail/ProductDetail";
import SearchResult from "../Page/SearchResult/SearchResult";
import Account from "../Page/AcountActions/Account";
import Pay from "../Page/Pay/Pay";
import List from "../Page/Admin/Product/List";
import LoginAdmin from "../Page/Admin/Login/Login";
import New from "../Page/Admin/Product/New";
import ListCategory from "../Page/Admin/Category/List";
import NewCategory from "../Page/Admin/Category/New";
import Edit from "../Page/Admin/Product/edit";
import EditCategory from "../Page/Admin/Category/Edit";
import UserCustomer from "../Page/Admin/UserCustomer/UserCustomer";
import EditUser from "../Page/Admin/UserCustomer/EditUser";
import BannerList from "../Page/Admin/Banner/List";
import BannerNew from "../Page/Admin/Banner/New";
import BannerEdit from "../Page/Admin/Banner/Edit";
import ListOrder from "../Page/Admin/Order/List";
import OrderDetial from "../Page/Admin/Order/detial";
import UserOrder from "../Page/Order/Order";
import UorderDetial from "../Page/Order/Detail";

export const routesConfig = [
  { path: "/", component: Home },
  { path: "/category/:name", component: CategoryDetail, layout: SidebarLayout },
  {
    path: "/category/:name/:product",
    component: CategoryDetail,
    layout: SidebarLayout,
  },
  { path: "/product/:id", component: ProductDetail },
  { path: "/search", component: SearchResult, layout: SidebarLayout },
  // {
  //   path: "/search/:query/page/:pageNumber",
  //   component: SearchResult,
  //   layout: SidebarLayout,
  // },
  { path: "/cart", component: Cart },
  { path: "/user/:type", component: Account },
  { path: "/user/order", component: UserOrder },
  { path: "/user/order/:id", component: UorderDetial },
  { path: "/pay", component: Pay },
  { path: "/admin/", component: LoginAdmin },
  { path: "/admin/user", component: UserCustomer, layout: LayoutaAdmin },
  { path: "/admin/user/edit/:id", component: EditUser, layout: LayoutaAdmin },
  { path: "/admin/products/", component: List, layout: LayoutaAdmin },
  { path: "/admin/products/new", component: New, layout: LayoutaAdmin },
  { path: "/admin/products/:id", component: Edit, layout: LayoutaAdmin },
  { path: "/admin/categories", component: ListCategory, layout: LayoutaAdmin },
  { path: "/admin/categories/new", component: NewCategory, layout: LayoutaAdmin },
  { path: "/admin/categories/:id", component: EditCategory, layout: LayoutaAdmin },
  { path: "/admin/banners/", component: BannerList, layout: LayoutaAdmin },
  { path: "/admin/banners/new", component: BannerNew, layout: LayoutaAdmin },
  { path: "/admin/banners/:id", component: BannerEdit, layout: LayoutaAdmin },
  { path: "/admin/order/", component: ListOrder, layout: LayoutaAdmin },
  { path: "/admin/order/:id", component: OrderDetial, layout: LayoutaAdmin },


];

export const privateRoute = [

];
