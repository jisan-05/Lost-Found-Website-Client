import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import LostAndFound from "../Components/LostAndFound/LostAndFound";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivetRoute from "../Components/PrivetRoute/PrivetRoute";
import AllRecoverItems from "../Components/AllRecoverItems/AllRecoverItems";
import AllLostAndFoundItems from "../Components/AllLostAndFoundItems/AllLostAndFoundItems";
import ItemsDetails from "../Components/ItemsDetails/ItemsDetails";
import ManageMyItem from "../Components/ManageMyItem/ManageMyItem";
import UpdateItem from "../Components/UpdateItem/UpdateItem";

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
                path: "/AddLostAndFoundItems",
                element: (
                    <PrivetRoute>
                        <LostAndFound></LostAndFound>
                    </PrivetRoute>
                ),
            },
            {
                path: "/AllLostAndFoundItems",
                element: <AllLostAndFoundItems></AllLostAndFoundItems>,
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
                path: "/allRecoverItems",
                element: <PrivetRoute><AllRecoverItems></AllRecoverItems></PrivetRoute>,
            },
            {
                path: "/myItems",
                element:<PrivetRoute><ManageMyItem></ManageMyItem></PrivetRoute>,
            },
            {
                path: "/items/:id",
                element:<PrivetRoute> <ItemsDetails></ItemsDetails></PrivetRoute>,
            },
            {
                path:"/update/:id",
                element:<UpdateItem></UpdateItem>
            }
        ],
    },
]);

export default router;
