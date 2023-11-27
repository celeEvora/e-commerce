import storage from "./Storage/storage";
import axios from 'axios';

export const sendRequestWithToken = async (method, params, url, signal) => {
  try {
    const authToken = storage.get('authToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;

    const response = await axios({ method, url, data: params, signal });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendRequestWithToken;