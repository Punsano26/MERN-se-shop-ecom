import api from './api';
const API_URL = "";

const getAllProducts = async () => {
    //http://localhost:5173/product.json
    return await api.get(`${API_URL}/product.json`);
}

const ProductServie = {
    getAllProducts,
}
export default ProductServie;