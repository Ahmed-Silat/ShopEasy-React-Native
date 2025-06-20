import axios from "axios";

const API_BASE = "https://685531a56a6ef0ed6631a039.mockapi.io"; // replace with your actual MockAPI URL

export const fetchProducts = () => axios.get(`${API_BASE}/Products`);
export const fetchProductById = (id) => axios.get(`${API_BASE}/Products/${id}`);
export const fetchReviewsByProductId = (productId) =>
  axios.get(`${API_BASE}/Reviews?productId=${productId}`);
export const postReview = (reviewData) =>
  axios.post(`${API_BASE}/reviews`, reviewData);
