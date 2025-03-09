import React, { useState, useEffect } from "react";
import CardItemsAdmin from "../../components/CardItemsAdmin";
import ProductServices from "../../services/product.service";

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.getAllProducts();
        const data = response.data;
        setProducts(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div>
          <div className="card card-border bg-base-100 w-80">
            <div className="card-body">
              <h2 className="card-title">Add A new Product</h2>
              <p>
              A card component for adding a new product includes an image section.
              </p>
              <div className="card-actions justify-end">
                <a href="/dashboard/add-product" className="btn bg-blue-400 hover:bg-blue-500">Add Products</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card card-border bg-base-100 w-80">
            <div className="card-body">
              <h2 className="card-title">Manages Items</h2>
              <p>
              A card component for Manage Items displays a figure, a title, and action buttons.
              </p>
              <div className="card-actions justify-end">
                <a href="/dashboard/manage-items" className="btn bg-green-400 hover:bg-green-500">Manage Items</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card card-border bg-base-100 w-80">
            <div className="card-body">
              <h2 className="card-title">Manage Orders</h2>
              <p>
              A card component for Manage Orders includes an order summary figure.
              </p>
              <div className="card-actions justify-end">
                <a href="/dashboard/manage-orders" className="btn bg-fuchsia-400 hover:bg-fuchsia-500">Manage Orders</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card card-border bg-base-100 w-80">
            <div className="card-body">
              <h2 className="card-title">Manage Users</h2>
              <p>
                A card component has a figure, a body part, and Manage users action buttons.
              </p>
              <div className="card-actions justify-end">
                <a href="/dashboard/all-users" className="btn bg-violet-400 hover:bg-violet-500">Manage Users</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="flex flex-wrap justify-center gap-4" id="admin-page">
        {products.length > 0 &&
          products.map((item, index) => {
            return <CardItemsAdmin items={item} key={index} />;
          })}
      </div> */}
    </>
  );
};

export default AdminPage;
