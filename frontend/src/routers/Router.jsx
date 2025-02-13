import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/index";
import Shop from "../pages/Shop/index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";
import SettingProfile from "../components/SettingProfile";

import ProtectPage from "../pages/ProtectPage";
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
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
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
    ],
  },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //   },
]);
export default router;
