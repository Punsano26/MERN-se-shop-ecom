import React from "react";
import logo from "/unnamed.png";
import { GiAbstract005 } from "react-icons/gi";
import { GiAbstract028 } from "react-icons/gi";
import { GiAbstract038 } from "react-icons/gi";
import { GiAfterburn } from "react-icons/gi";
import { GiExecutionerHood } from "react-icons/gi";
import { GiLockedChest } from "react-icons/gi";
import { GiMedievalBarracks } from "react-icons/gi";
import { GiNunFace } from "react-icons/gi";
import { GiSkullInJar } from "react-icons/gi";
import { Outlet } from "react-router";
const AdminLayout = () => {
  const isAdmin = true;

  return (
    <>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} className="w-20" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a>
                  <GiAbstract028 />
                  Dashboard
                </a>
              </li>
              <li>
                <a>
                  <GiAbstract005 />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/dashboard/add-product">
                  <GiAbstract038 />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-items">
                  <GiAfterburn />
                  Manage Items
                </a>
              </li>
              <li>
                <a>
                  <GiExecutionerHood />
                  All Users
                </a>
              </li>

              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>

              <li>
                <a>
                  <GiLockedChest />
                  home
                </a>
              </li>
              <li>
                <a>
                  <GiMedievalBarracks />
                  Product
                </a>
              </li>
              <li>
                <a>
                  <GiNunFace />
                  Oders tracking
                </a>
              </li>
              <li>
                <a>
                  <GiSkullInJar />
                  Customer Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>you are not admin</div>
      )}
    </>
  );
};

export default AdminLayout;
