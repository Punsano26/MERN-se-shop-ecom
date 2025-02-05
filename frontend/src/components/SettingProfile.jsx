import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { MdOutlineEdit } from "react-icons/md";
const SettingProfile = () => {
  const { user } = useContext(AuthContext);
  //ไว้ใช้สำหรับเพิ่มฟังก์การแก้ไขข้อมูล username&email

  if (!user) {
    return <div>you are not logged in</div>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="modal-box bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
        <h1 className="text-center mb-6">
          <MdOutlineEdit className="h-6 w-6 text-blue-600 inline-block align-middle mr-2" />
          Setting Profile
        </h1>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          UserName:
          <input type="text" className="grow" placeholder="Daisy" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Email:
          <input type="text" className="grow" placeholder="daisy@site.com" />
        </label>
        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SettingProfile;
