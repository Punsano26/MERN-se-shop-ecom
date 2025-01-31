import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/index";
import Shop from "../pages/Shop/index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";
import SettingProfile from "../components/SettingProfile";
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
        path: "/cart",
        element: <Cart />,
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
        element: <UserProfile />,
      },
      {
        path: "/settings",
        element: <SettingProfile />,
      },
    ],
  },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //   },
]);
export default router;
