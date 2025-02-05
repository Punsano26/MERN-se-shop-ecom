import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";

const SettingProfile = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [imageURL, setImageURL] = useState("");

  //ไว้ใช้สำหรับเพิ่มฟังก์การแก้ไขข้อมูล username&email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(username, imageURL);
      Swal.fire({
        title: "Your username&image updated!",
        text: "You update finish",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error?.response?.data?.message || error.message,
        timer: 2000,
      });
    }
  };
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
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            UserName:
            <input
              type="text"
              className="grow"
              placeholder="Daisy"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            Image URL:
            <input
              type="text"
              className="grow"
              placeholder="URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingProfile;
