import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Components/Home";
import AllProducts from "../Components/AllProducts";
import MyProducts from "../Components/MyProducts";
import MyBids from "../Components/MyBids";
import CreateProducts from "../Components/CreateProducts";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../Components/ProductDetails";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/allProducts',
                Component: AllProducts,
            },
            {
                path: '/myProducts',
                element: <PrivateRoute>
                    <MyProducts></MyProducts>
                </PrivateRoute>,
            },
            {
                path: '/myBids',
                element: <PrivateRoute>
                    <MyBids></MyBids>
                </PrivateRoute>,
            },
            {
                path: '/createProducts',
                Component: CreateProducts,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/productDetails/:id',
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>,
                loader: ({ params })=> fetch(`http://localhost:3000/products/${params.id}`),
            }

        ]
    }
])
