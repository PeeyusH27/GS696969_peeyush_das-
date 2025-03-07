import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStoreAlt } from "react-icons/fa";
import { LuShapes } from "react-icons/lu";
import { IoBarChart } from "react-icons/io5";
import { MdOutlineInsertChart } from "react-icons/md";

import gsynergy from "/src/Assets/Gsynergy.svg";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar w-full md:w-[14vw] h-fit md:h-screen p-2 gap-2 flex flex-col">
      <div className="mb-6 flex justify-center items-center">
        <Link to="/">
          <img src={gsynergy} width={140} alt="" />
        </Link>
      </div>
      <Link
        to="/stores"
        className={`flex gap-3 px-2 py-3 items-center hover:bg-teal-600 hover:text-white rounded-lg ${
          location.pathname === "/stores" ? "bg-teal-600 text-white" : ""
        }`}
      >
        <span>
          <FaStoreAlt />
        </span>{" "}
        Stores
      </Link>
      <Link
        to="/sku"
        className={`flex gap-3 px-2 py-3 items-center hover:bg-teal-600 hover:text-white rounded-lg ${
          location.pathname === "/sku" ? "bg-teal-600 text-white" : ""
        }`}
      >
        <span>
          <LuShapes />
        </span>{" "}
        SKU
      </Link>
      <Link
        to="/planning"
        className={`flex gap-3 px-2 py-3 items-center hover:bg-teal-600 hover:text-white rounded-lg ${
          location.pathname === "/planning" ? "bg-teal-600 text-white" : ""
        }`}
      >
        <span>
          <IoBarChart />
        </span>{" "}
        Planning
      </Link>
      <Link
        to="/chart"
        className={`flex gap-3 px-2 py-3 items-center hover:bg-teal-600 hover:text-white rounded-lg ${
          location.pathname === "/chart" ? "bg-teal-600 text-white" : ""
        }`}
      >
        <span>
          <MdOutlineInsertChart />
        </span>{" "}
        Chart
      </Link>
    </div>
  );
};

export default Sidebar;
