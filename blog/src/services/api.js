import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // FastAPI backend

export const getBlogs = () => axios.get(`${BASE_URL}/blogs/`);
export const createBlog = (data) => axios.post(`${BASE_URL}/blogs/`, data);
export const updateBlog = (id, data) => axios.put(`${BASE_URL}/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`${BASE_URL}/blogs/${id}`);
export const getBlogById = (id) => axios.get(`${BASE_URL}/blogs/${id}`);

