import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white text-center py-6 mt-5">
      <p className="text-sm text-gray-400 font-bold">
        Copyright &copy; {new Date().getFullYear()} Get Me A Chai — All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
