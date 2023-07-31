import { createBrowserRouter } from "react-router-dom";
// ROUTES 
import Home from "../pages/home-page/Home";
import SignIn from '../pages/sign-in-page';
import SignUp from '../pages/sign-up-page';
import Cart from '../pages/cart-page';
import Payment from "../pages/payment-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: <Cart />,
  }, 
  {
    path: "/payment",
    element: <Payment />,
  },    
]);

export { router };
