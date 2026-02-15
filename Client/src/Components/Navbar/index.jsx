// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <div>
//       <h1>Cin Mony </h1>
//       <div>
//       <Link to="/">Home</Link>
//       <Link to="/auth">Login/Register</Link>
//       <Link to="/profile">Profile</Link>
//       <Link to="/categories/all/all">Categories</Link>
//       <Link to="/transactions/all">Transactions</Link>
//       <Link to="/reports">Reports</Link>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-black to-gray-900 border-b border-red-600 shadow-lg shadow-red-900/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-0 
                         relative inline-block w-fit
                         after:content-[''] after:absolute after:bottom-0 after:left-0 
                         after:w-full after:h-0.5 after:bg-red-600
                         transform hover:scale-105 transition-transform duration-300">
            Cin Mony
          </h1>
          
          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            <Link to="/" 
                  className="px-3 py-2 text-sm md:text-base text-gray-300 font-medium 
                           hover:text-white hover:bg-red-600 rounded-lg
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-red-600 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
            
            <Link to="/auth" 
                  className="px-3 py-2 text-sm md:text-base text-gray-300 font-medium 
                           hover:text-white hover:bg-red-600 rounded-lg
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Login/Register</span>
              <span className="absolute inset-0 bg-red-600 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
            
            <Link to="/profile" 
                  className="px-3 py-2 text-sm md:text-base text-gray-300 font-medium 
                           hover:text-white hover:bg-red-600 rounded-lg
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Profile</span>
              <span className="absolute inset-0 bg-red-600 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
            
            <Link to="/categories/all/all" 
                  className="px-3 py-2 text-sm md:text-base text-gray-300 font-medium 
                           hover:text-white hover:bg-red-600 rounded-lg
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Categories</span>
              <span className="absolute inset-0 bg-red-600 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
            
            <Link to="/transactions/all" 
                  className="px-3 py-2 text-sm md:text-base text-gray-300 font-medium 
                           hover:text-white hover:bg-red-600 rounded-lg
                           transition-all duration-300 ease-in-out
                           border border-transparent hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Transactions</span>
              <span className="absolute inset-0 bg-red-600 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
            
            <Link to="/reports" 
                  className="px-3 py-2 text-sm md:text-base bg-red-600 text-white 
                           font-medium rounded-lg
                           hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30
                           transition-all duration-300 ease-in-out
                           border border-red-500 hover:border-red-400
                           relative overflow-hidden group">
              <span className="relative z-10">Reports</span>
              <span className="absolute inset-0 bg-red-700 transform scale-x-0 
                             group-hover:scale-x-100 transition-transform duration-300 
                             origin-left"></span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </div>
  );
}