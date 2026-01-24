import axios from 'axios';

const API_BASE_URL = "https://askify.up.railway.app/api" ;

const api = axios.create({
  baseURL: API_BASE_URL,
});
 
export const sendMessage = async (message) => {
  const response = await api.post('/chat', { message });
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};