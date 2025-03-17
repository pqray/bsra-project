import React, { useState } from "react";
import formController from "../../controllers/formController";
import styles from "./AddForm.module.css";

interface AddFormProps {
  sendMessageToChat: (message: string) => void;
  setTypingStatus: (status: boolean) => void;
}

const AddForm: React.FC<AddFormProps> = ({ sendMessageToChat, setTypingStatus }) => {
  const [formData, setFormData] = useState({
    tipo: "",
    descricao: "",
    comunidade: "",
    estado: "",
    componente: "",
    tecnologia: "",
    name1: "",
    name2: "",
    name3: "",
    source: "",
    interface: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasValidated, setHasValidated] = useState(false);

  const isFieldEnabled = (field: string) => {
    const fieldsOrder = [
      "tipo", "descricao", "comunidade", "estado", "componente", "tecnologia",
      "name1", "name2", "name3", "source", "interface"
    ];
    const index = fieldsOrder.indexOf(field);
    if (index === 0) return true;
    return fieldsOrder.slice(0, index).every((key) => formData[key as keyof typeof formData] !== "");
  };

  const handleDropdownChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setTypingStatus(true); // Exibir efeito de digitação no ChatAssistant
    setIsLoading(true);

    try {
      const response = await formController.sendDropdownSelection(name, value);
      console.log(`Resposta da API para ${name}:`, response);

      if (response?.message?.length) {
        sendMessageToChat(response.message[0]); // Enviar resposta ao ChatAssistant
      }
    } catch (error) {
      sendMessageToChat(`Erro ao processar ${name}`);
    } finally {
      setIsLoading(false);
      setTypingStatus(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Se o usuário altera "descricao", permite nova validação
    if (e.target.name === "descricao") {
      setHasValidated(false);
    }
  };

  const validateFields = async () => {
    if (formData.tipo && formData.descricao && !hasValidated) {
      setTypingStatus(true);
      setIsLoading(true);
      try {
        const response = await formController.validateTypeAndDescription(formData.tipo, formData.descricao);
        console.log("Resposta da API:", response);

        if (response?.message?.length) {
          sendMessageToChat(response.message[0]);
        }
      } catch (error) {
        sendMessageToChat("Erro ao validar o serviço.");
      } finally {
        setIsLoading(false);
        setTypingStatus(false);
      }
    }
  };

  const handleBlur = (field: string) => {
    if (field === "descricao") {
      validateFields();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.rowFull}>
          <label>Tipo</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            onBlur={() => handleBlur("tipo")}
            required
          >
            <option value="">Selecione...</option>
            <option value="Microsserviço">Microsserviço</option>
          </select>
        </div>

        <div className={styles.rowFull}>
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            onBlur={() => handleBlur("descricao")}
            required
            disabled={!isFieldEnabled("descricao")}
          />
        </div>

        <div className={styles.row}>
          <label>Comunidade</label>
          <select name="comunidade" value={formData.comunidade} onChange={handleDropdownChange} required disabled={!isFieldEnabled("comunidade")}>
            <option value="">Selecione...</option>
            <option value="capitalizaçao">Capitalização</option>
            <option value="previdencia">Previdência</option>
            <option value="saude">Saúde</option>
            <option value="bare">Bare</option>
            <option value="canais-digitais">Canais Digitais</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleDropdownChange} required disabled={!isFieldEnabled("estado")}>
            <option value="">Selecione...</option>
            <option value="em desenvolvimento">Em desenvolvimento</option>
            <option value="em producao">Em produção</option>
            <option value="em teste">Em teste</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Componente</label>
          <select name="componente" value={formData.componente} onChange={handleDropdownChange} required disabled={!isFieldEnabled("componente")}>
            <option value="">Selecione...</option>
            <option value="BFF: Back-end for Front-End">BFF: Back-end for Front-End</option>
            <option value="SRV: Service">SRV: Service</option>
            <option value="FED: Front-end">FED: Front-end</option>
            <option value="LIB: Library">LIB: Library</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Tecnologia</label>
          <select name="tecnologia" value={formData.tecnologia} onChange={handleDropdownChange} required disabled={!isFieldEnabled("tecnologia")}>
            <option value="">Selecione...</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="node">Node</option>
            <option value="springboot">Springboot</option>
            <option value="angular">Angular</option>
            <option value="cobol">Cobol</option>
          </select>
        </div>

        <div className={styles.rowTriple}>
          <label>Nome</label>
          <div className={styles.flexDisplay}>
            <input type="text" name="name1" value={formData.name1} onChange={handleChange} required disabled={!isFieldEnabled("name1")} />
            <input type="text" name="name2" value={formData.name2} onChange={handleChange} required disabled={!isFieldEnabled("name2")} />
            <input type="text" name="name3" value={formData.name3} onChange={handleChange} required disabled={!isFieldEnabled("name3")} />
          </div>
        </div>

        <div className={styles.rowFull}>
          <label>Fonte</label>
          <input type="text" name="source" value={formData.source} onChange={handleChange} required disabled={!isFieldEnabled("source")} />
        </div>

        <div className={styles.rowFull}>
          <label>Interface</label>
          <input type="text" name="interface" value={formData.interface} onChange={handleChange} required disabled={!isFieldEnabled("interface")} />
        </div>

        <button type="submit" disabled={!isFieldEnabled("interface")}>Cadastrar</button>
      </form>
    </div>
  );
};

export default AddForm;
