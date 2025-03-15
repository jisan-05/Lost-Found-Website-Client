import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";
"use client";

const MainLayout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      {/* Scroll Indicator */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 7,
          originX: 0,
          zIndex: 10,
          backgroundColor: "#3a86ff",
        }}
      />
      
      <Navbar />
      
      <div className="flex-1 overflow-auto">
        <Outlet />
        
      </div>
      
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
