import axios from 'axios';

const API_URL = 'http://localhost:8080/api/files';

export const uploadCadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getRecentFiles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
// Add this to your existing cadApi.js
export const getAllFiles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};