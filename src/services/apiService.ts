import axios from "axios";

const API_BASE_URL = "http://10.130.154.104:7050/";

const apiService = {
  post: async (endpoint: string, data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao chamar ${endpoint}:`, error);
      throw error;
    }
  }
};

export default apiService;
