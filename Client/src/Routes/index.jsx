import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import PublicLayout from "../Layout/Public";
import Auth from "../Pages/Auth";
import PrivateLayout from "../Layout/Private";
import Profile from "../Pages/Profile";
import Categories from "../Pages/Categories";
import Transactions from "../Pages/Transactions";
import Reports from "../Pages/Reports";
import CreateCategory from "../Pages/CreateCategory";
import CategoryDetails from "../Pages/CategoryDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/auth",
            element: <Auth />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/categories/:id/:name",
            element: <Categories />,
          },
        ],
      },
      {
        path: "/transactions/:category",
        element: <Transactions />,
      },
      {
        path:"/reports",
        element:<Reports />
      } ,
      {
        path:"/create-category",
        element:<CreateCategory />
      } ,
      {
        path:"/category-details/:id",
        element:<CategoryDetails/>
      }
    ],
  },
]);
export default router;
