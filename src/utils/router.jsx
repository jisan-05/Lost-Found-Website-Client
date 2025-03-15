import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import LostAndFound from "../Components/LostAndFound/LostAndFound";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivetRoute from "../Components/PrivetRoute/PrivetRoute";
import AllRecoverItems from "../Components/AllRecoverItems/AllRecoverItems";
import ManageMyItem from "../Components/ManageMyItem/ManageMyItem";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/lostAndFound",
                element: (
                    <PrivetRoute>
                        <LostAndFound></LostAndFound>
                    </PrivetRoute>
                ),
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path:'/allRecoverItems',
                element:<AllRecoverItems></AllRecoverItems>
            },
            {
                path:'/manageMyItem',
                element:<ManageMyItem></ManageMyItem>
            }
        ],
    },
]);

export default router;
