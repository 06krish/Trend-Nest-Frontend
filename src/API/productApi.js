
import axiosInstance from "./axiosInstance.js";

export const getAllProducts = async () => {
    const response = await axiosInstance.get("/api/product");
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response.data;
};

export const searchProducts = async (params = {}) => {
    const response = await axiosInstance.get("/api/product/search", {
        params,
    });
    return response.data;
};
