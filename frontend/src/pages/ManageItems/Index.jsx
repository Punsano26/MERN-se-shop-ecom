import React from "react";
import ProductServices from "../../services/product.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>action</th>
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
