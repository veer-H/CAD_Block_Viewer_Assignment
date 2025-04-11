import axios from 'axios';

const API_URL = 'http://localhost:8080/api/blocks';

export const getBlocks = async (fileId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { fileId, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};

export const getBlockById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
};