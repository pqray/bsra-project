import apiService from "../services/apiService";

const formController = {
  validateTypeAndDescription: async (tipo: string, descricao: string) => {
    try {
      if (!tipo || !descricao) return null;
      const payload = { tipo, descricao };

      console.log("Enviando payload:", payload);
      const response = await apiService.post("tipo_descricao", payload);

      return response;
    } catch (error) {
      console.error("Erro ao validar tipo e descrição:", error);
      throw error;
    }
  },

  sendDropdownSelection: async (field: string, value: string) => {
    try {
      if (!field || !value) return null;
      const endpoint = `dropdowns/${field}`;
      const payload = { [field]: value };

      console.log(`Enviando para ${endpoint}:`, payload);
      const response = await apiService.post(endpoint, payload);

      return response;
    } catch (error) {
      console.error(`Erro ao validar ${field}:`, error);
      throw error;
    }
  },

  sendUserQuestion: async (question: string) => {
    try {
      if (!question.trim()) return null;
      const payload = { pergunta: question };

      console.log("Enviando pergunta:", payload);
      const response = await apiService.post("perguntas", payload);

      return response;
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      throw error;
    }
  },
};

export default formController;
