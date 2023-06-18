import Products from "./components/Products/Products";
import Comments from "./components/Comments/Comments";
import Home from "./components/Home/Home";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/comments", element: <Comments /> },
];

export default routes;
    