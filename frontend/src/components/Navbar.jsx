import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#0B2344] via-[#143866] to-[#0B2344] text-white border-b border-[#1e4b85] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side - Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 duration-300">
            <div className="bg-[#38BDF8] bg-opacity-20 p-2 rounded-lg backdrop-blur-sm border border-[#38BDF8]/30">
              {/* Premium Analytics SVG Icon */}
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="font-extrabold text-xl md:text-2xl tracking-tight">
              <span className="text-[#38BDF8]">OP</span> <span className="text-gray-100">BetMitra</span>
            </div>
          </div>

          {/* Right Side - Status / Badge */}
          <div className="flex items-center gap-3">
            {/* Desktop Badge */}
            <div className="hidden sm:flex items-center gap-2.5 bg-[#0B2344] px-4 py-1.5 rounded-full border border-[#1e4b85] shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-300 tracking-wider uppercase">
                Live Analytics
              </span>
            </div>

            {/* Mobile Badge (Smaller & compact) */}
            <div className="sm:hidden flex items-center gap-2 bg-[#0B2344] px-3 py-1.5 rounded-full border border-[#1e4b85]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">
                Live
              </span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;