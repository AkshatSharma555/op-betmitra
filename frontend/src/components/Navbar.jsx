import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#143866] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl tracking-wider uppercase">
            OP BetMitra
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-medium text-[#38BDF8]">
              Dashboard & Analytics
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;