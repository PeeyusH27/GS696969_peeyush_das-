//As in tthe application only the pages are changing but sidebar is holding its place i'm tying to make a layout and pass all the pages as children
import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaHamburger } from "react-icons/fa";

type LayoutPages = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutPages) => {
  const [showHam, setShowHam] = useState<boolean>(false);
  const toggle: {} = () => {
    setShowHam((prev) => !prev);
    // console.log(showHam ? "true" : "false");
    
  };
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="h-screen flex flex-col w-full ">
        <div className="flex">
          {showHam &&
          <div className="absolute md:hidden inset-0 mt-20 z-10 w-full h-1/2 bg-white border-black border border- ">
            <Sidebar />
          </div>
          }
          <div className="flex h-full items-center p-4 md:hidden" onClick={toggle}>
          <FaHamburger />
          </div>
          <Navbar />
        </div>
        <div className="h-full bg-zinc-200 p-3">
          <div className="h-full w-full rounded-lg overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
    // <div className='h-[100vh] pt-[7vh] md:w-full overflow-hidden hidden md:flex'>
    //     {/* Stays on left */}
    //     <Sidebar />
    //     {/* Right side pages */}
    //     <div className='pages overflow-y-scroll bg-gray-200 flex-1 p-4'>
    //         {children}
    //     </div>
    // </div>
  );
};

export default Layout;
