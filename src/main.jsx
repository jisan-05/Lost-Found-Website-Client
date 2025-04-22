import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./utils/router.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        
       <HelmetProvider>
       <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false}></Toaster>
        </AuthProvider>
       </HelmetProvider>
        
    </StrictMode>
);
