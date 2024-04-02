// layouts
import SidebarLayout from "../Layouts/SidebarLayout/SidebarLayout";

// Pages
import Home from "../Page/Home/Home";
import Cart from "../Page/Cart/Cart";
import CategoryDetail from "../Page/CategoryDetail/CategoryDetail";
import ProductDetail from "../Page/ProductDetail/ProductDetail";
import SearchResult from "../Page/SearchResult/SearchResult";
import Account from "../Page/AcountActions/Account";
import AdminLogin from "../Page/AdminLogin/AdminLogin";
import Pay from "../Page/Pay/Pay";
import List from "../Page/Admin/Product/List";
import LayoutaAdmin from "../Layouts/AdminLayout/Admin";

export const routesConfig = [
  { path: "/", component: Home },
  { path: "/category/:name", component: CategoryDetail, layout: SidebarLayout },
  {
    path: "/category/:name/:product",
    component: CategoryDetail,
    layout: SidebarLayout,
  },
  { path: "/product/:id", component: ProductDetail },
  { path: "/search/:query", component: SearchResult, layout: SidebarLayout },
  {
    path: "/search/:query/page/:pageNumber",
    component: SearchResult,
    layout: SidebarLayout,
  },
  { path: "/cart", component: Cart },
  { path: "/user/:type", component: Account },
  { path: "/pay", component: Pay },
];

export const privateRoute = [
  {
    path: "/admin/products",
    component: List,
    layout: LayoutaAdmin
  },
  { path: "/admin/login", component: AdminLogin },
];
