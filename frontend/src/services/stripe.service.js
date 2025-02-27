import api from "./api";
const API_URL = "/stripe";

const createCheckOutSession = (data) => {
  return api.post(`${API_URL}/create-checkout-session`, data);
};

const StripeService = {
  createCheckOutSession,
};
export default StripeService;
