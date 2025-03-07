import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showHam, setShowHam] = useState(false)
  return (
    <div className={"p-2 flex justify-between items-center w-full bg-white"}>
      <div className="text-lg sm:text-3xl text-teal-600 font-bold mx-auto">Data Viewer App</div>
      <div className="h-full p-2">
        <Link to='/profile/:user-id' className="justify-self-end">
          <FaUserCircle className="h-10 w-10" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
