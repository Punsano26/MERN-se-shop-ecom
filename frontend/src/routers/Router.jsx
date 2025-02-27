import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/index";
import Shop from "../pages/Shop/index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";
import SettingProfile from "../components/SettingProfile";
import AdminPage from "../pages/Admin/index";
import ProductAdd from "../pages/Admin/ProductAdd";
import ManageItems from "../pages/ManageItems/Index";
import ProtectPage from "../pages/ProtectPage";
import ProtectLogReg from "../pages/ProtectPage/ProtectLogReg";
import AdminRoute from "../ProtectedRoutes/AdminRoute";
import Alluser from "../pages/Admin/Alluser";
import CheckOutSuccess from "../pages/CheckOutSuccess";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signup",
        element:
        <ProtectLogReg>
           <SignUp />
        </ProtectLogReg>
       
      },
      {
        path: "/signin",
        element:(
         <ProtectLogReg>
             <SignIn />     
          </ProtectLogReg>     
          ),
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <UserProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectPage>
            <SettingProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/checkout-success",
        element:(
          <CheckOutSuccess/>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      { path: "", element: <AdminPage /> },
      { path: "add-product", element: <ProductAdd /> },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "all-users",
        element: <Alluser />,
      },
    ],
  },
]);
export default router;
