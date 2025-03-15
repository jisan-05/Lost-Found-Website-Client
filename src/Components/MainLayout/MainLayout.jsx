import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
    
      <Navbar />
      <div className="flex-1 overflow-auto">
        
        <Outlet />
        
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
