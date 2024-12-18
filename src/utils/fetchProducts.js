import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (limit = 12, skip = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?limit=${limit}&skip=${skip}`);

    console.log(response);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
