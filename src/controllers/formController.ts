import apiService from "../services/apiService";

const formController = {
    validateTypeAndDescription: async (
        tipo: string,
        descricao: string,
        setTypingStatus: (status: boolean) => void
    ) => {
        try {
            if (!tipo || !descricao) return null;
            setTypingStatus(true); // Ativa dots no ChatAssistant

            const payload = { tipo, descricao };
            console.log("Enviando payload:", payload);
            const response = await apiService.post("tipo_descricao", payload);

            return response;
        } catch (error) {
            console.error("Erro ao validar tipo e descrição:", error);
            throw error;
        } finally {
            setTypingStatus(false); // Remove dots após a resposta
        }
    },

    sendDropdownSelection: async (
        field: string,
        value: string,
        setTypingStatus: (status: boolean) => void
    ) => {
        try {
            if (!field || !value) return null;
            setTypingStatus(true); // Ativa dots no ChatAssistant

            const endpoint = `dropdowns`;
            const payload = { [field]: value };

            console.log(`Enviando para ${endpoint}:`, payload);
            const response = await apiService.post(endpoint, payload);

            return response;
        } catch (error) {
            console.error(`Erro ao validar ${field}:`, error);
            throw error;
        } finally {
            setTypingStatus(false); // Remove dots após a resposta
        }
    },

    sendUserQuestion: async (question: string, setTypingStatus: (status: boolean) => void) => {
        try {
            if (!question.trim()) return null;
            setTypingStatus(true); // Ativa dots no ChatAssistant

            const payload = { pergunta: question };
            console.log("Enviando pergunta:", payload);
            const response = await apiService.post("perguntas", payload);

            return response;
        } catch (error) {
            console.error("Erro ao enviar pergunta:", error);
            throw error;
        } finally {
            setTypingStatus(false); // Remove dots após a resposta
        }
    },
    sendFonteValidation: async (fonte: string, setTypingStatus: (status: boolean) => void) => {
        try {
            if (!fonte.trim()) return null;
            setTypingStatus(true);

            const payload = { fonte };
            console.log("Enviando para /fonte:", payload);
            const response = await apiService.post("fonte", payload);

            return response;
        } catch (error) {
            console.error("Erro ao validar fonte:", error);
            throw error;
        } finally {
            setTypingStatus(false);
        }
    },
    sendInterfaceValidation: async (interfaceValue: string, setTypingStatus: (status: boolean) => void) => {
        try {
            setTypingStatus(true);
            const response = await apiService.post("interface", { interface: interfaceValue });
            return response;
        } catch (error) {
            console.error("Erro ao validar interface:", error);
        } finally {
            setTypingStatus(false);
        }
    },
    sendNomeValidation: async (nomeCompleto: string, setTypingStatus: (status: boolean) => void) => {
        try {
            setTypingStatus(true);
            const response = await apiService.post("nome", { nome: nomeCompleto });
            return response;
        } catch (error) {
            console.error("Erro ao validar nome:", error);
        } finally {
            setTypingStatus(false);
        }
    },
    sendCadastro: async (setTypingStatus: (status: boolean) => void) => {
        try {
            setTypingStatus(true);

            const response = await apiService.post("cadastrar", { cadastrar: "ok" });

            // Simulando um retorno CSV
            if (!response || !response.csv) {
                return { csv: "ID, Nome, Status\n1, Projeto A, Sucesso\n2, Projeto B, Falha" };
            }

            return response;
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            return { csv: "⚠️ Erro ao gerar CSV" };
        } finally {
            setTypingStatus(false);
        }
    }
};

export default formController;
