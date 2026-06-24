import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import { motion } from 'framer-motion';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-primary">
      <ScrollProgress />
      <Navbar />
      
      {/* Main page content container */}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;
