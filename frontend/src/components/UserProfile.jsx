import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const maskingString = (str, start, end) => {
    if (
      !str ||
      start < 0 ||
      start >= str.length ||
      end < 0 ||
      end > str.length ||
      start > end
    ) {
      return str;
    }
    const maskedStr = str.slice(0, start) + "*".repeat(20) + str.substring(end);
    return maskedStr;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.email) {
    return <div>Email : {user.email}</div>;
  }

  return (
    <div className="h-screen flex flex-wrap items-center justify-center">
      <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
        <div className="h-32 overflow-hidden">
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
        </div>
        <div className="flex justify-center px-5 -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full"
            src={
              user.photoURL ||
              "https://pics.craiyon.com/2024-04-15/Ne_ExpINQpmIUGKzazfssA.webp"
            }
            alt=""
          />
        </div>
        <div className="">
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">
              {user.displayName || user.username}
            </h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/ps_xinan/"
              target="BLANK()"
            >
              @{user.displayName}
            </a>
            <p className="mt-2 text-gray-500 text-sm">{user.email}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              consequuntur.
            </p>
            <p>
              <span className="font-semibold text-gray-500">Token:</span>{" "}
              {maskingString(user.accessToken, 3, user.accessToken.length - 3)}
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex bg-gray-50">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">7.5 k </span> Followers
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">2.0 k </span> Following
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
