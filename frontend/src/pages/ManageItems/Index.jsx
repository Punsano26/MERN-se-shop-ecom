import React from "react";
import ProductServices from "../../services/product.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxPencil2 } from "react-icons/rx";
const Index = () => {
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductServices.getAllProducts();
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจว่าจะลบสินค้าชิ้นนี้",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ProductServices.deleteProduct(id);
          const newProducts = products.filter((product) => product._id !== id);
          setProducts(newProducts);
          Swal.fire({
            icon: "success",
            title: "ลบสินค้าสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ลบสินค้าไม่สำเร็จ",
        text: error.response.data.message || "ลบสินค้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //คือการเปิด modal และส่งข้อมูลสินค้าไปให้ modal
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
  //คือการปิด modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };
  //คือการอัพเดทข้อมูลสินค้า
  const handleUpdate = async (product) => {
    try {
      const res = await ProductServices.updateProduct(product);
      if (res.status === 200) {
        const newProducts = products.map((p) =>
          p._id === product._id ? product : p
        );
        setProducts(newProducts);
        Swal.fire({
          icon: "success",
          title: "อัพเดทสินค้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "อัพเดทสินค้าไม่สำเร็จ",
        text: error.response.data.message || "อัพเดทสินค้าไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //เปลี่ยนค่าข้อมูลสินค้า
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setCurrentProduct({ ...products, [name]: files[0] });
    } else {
      setCurrentProduct({ ...products, [name]: value });
    }
  };

  //เปลี่ยนค่าไฟล์รูปภาพ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentProduct({ ...currentProduct, file });
  };

  return (
    <div className="w-screen max-w-full overflow-x-auto">
      <div className="w-full overflow-x-auto">
        <table className="table w-full min-w-full border-collapse border border-gray-300">
          {/* head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.price}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {product.category}
                </td>
                <td className="border border-gray-300 text-center align-middle">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 hover:bg-yellow-200 rounded-lg"
                  >
                    <RxPencil2 className="w-8 h-8 text- text-yellow-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="hover:bg-rose-200 rounded-lg"
                  >
                    <RiDeleteBinLine className="w-8 h-8 text-rose-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* ModalEditFromnow! */}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description:</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">File Photo:</span>
                </label>

                {/* แสดงภาพที่อัปโหลดใหม่ ถ้ามี */}
                {currentProduct?.file && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={URL.createObjectURL(currentProduct.file)}
                      alt="New Product Preview"
                      className="max-w-xs"
                    />
                  </div>
                )}

                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="file-input file-input-neutral"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price:</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category:</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
