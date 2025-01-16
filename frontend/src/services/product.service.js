import api from "./api";
const API_URL = "http://localhost:5173";

const getAllProducts = async () => {
  //http://localhost:5173/product.json
  return await api.get(`${API_URL}/product.json`);
};

const ProductServices = {
  getAllProducts,
};
export default ProductServices;
