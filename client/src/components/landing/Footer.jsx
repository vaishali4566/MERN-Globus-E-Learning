import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-24 py-6 text-center text-sm">
      <p>
        © {new Date().getFullYear()} Globus E-Learning. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
