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
    nome1: "",
    nome2: "",
    nome3: "",
    fonte: "",
    interface: "",
  });

  const [hasValidated, setHasValidated] = useState(false);
  const [hasValidatedFonte, setHasValidatedFonte] = useState(false);
  const [hasValidatedInterface] = useState(false);
  const [hasValidatedNome] = useState(false);

  const nome1Options = ["bspn", "gpac", "gprs", "idbe", "opin", "ppra", "tcap"];
  const nome2Options = ["aux", "bff", "srv", "dat", "fed", "lib"];

  const isFieldEnabled = (field: string) => {
    const fieldsOrder = [
      "tipo", "descricao", "comunidade", "estado", "componente", "tecnologia",
      "nome1", "nome2", "nome3", "fonte", "interface"
    ];
    const index = fieldsOrder.indexOf(field);
    if (index === 0) return true;
    return fieldsOrder.slice(0, index).every((key) => formData[key as keyof typeof formData] !== "");
  };

  const handleDropdownChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setTypingStatus(true);

    try {
      const response = await formController.sendDropdownSelection(name, value, setTypingStatus);
      console.log(`Resposta da API para ${name}:`, response);

      if (response?.message?.length) {
        sendMessageToChat(response.message[0]);
      }
    } catch (error) {
      sendMessageToChat(`Erro ao processar ${name}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "descricao") {
      setHasValidated(false);
    }
    if (e.target.name === "fonte") {
      setHasValidatedFonte(false);
    }
  };

  const validateFields = async () => {
    if (formData.tipo && formData.descricao && !hasValidated) {
      setTypingStatus(true);

      try {
        const response = await formController.validateTypeAndDescription(formData.tipo, formData.descricao, setTypingStatus);
        console.log("Resposta da API:", response);

        if (response?.message?.length) {
          sendMessageToChat(response.message[0]);
        }
      } catch (error) {
        sendMessageToChat("Erro ao validar o serviço.");
      }
    }
  };

  const validateFonte = async () => {
    if (formData.fonte && !hasValidatedFonte) {
      setTypingStatus(true);

      try {
        const response = await formController.sendFonteValidation(formData.fonte, setTypingStatus);
        console.log("Resposta da API /fonte:", response);

        if (response?.message?.length) {
          sendMessageToChat(response.message[0]);
        }
      } catch (error) {
        sendMessageToChat("Erro ao validar a fonte.");
      }
    }
  };
  const validateInterface = async () => {
    if (formData.interface && !hasValidatedInterface) {
      setTypingStatus(true);

      try {
        const response = await formController.sendInterfaceValidation(formData.interface, setTypingStatus);
        console.log("Resposta da API /interface:", response);

        if (response?.message?.length) {
          sendMessageToChat(response.message[0]);
        }
      } catch (error) {
        sendMessageToChat("Erro ao validar a interface.");
      }
    }
  };
  const validateNome = async () => {
    if (formData.nome1 && formData.nome2 && formData.nome3 && !hasValidatedNome) {
      const nomeCompleto = `${formData.nome1}-${formData.nome2}-${formData.nome3}`;
      setTypingStatus(true);

      try {
        const response = await formController.sendNomeValidation(nomeCompleto, setTypingStatus);
        console.log("Resposta da API /nome:", response);

        if (response?.message?.length) {
          sendMessageToChat(response.message[0]);
        }
      } catch (error) {
        sendMessageToChat("Erro ao validar o nome.");
      }
    }
  };

  const handleBlur = (field: string) => {
    if (field === "descricao") {
      validateFields();
    }
    if (field === "fonte") {
      validateFonte();
    }
    if (field === "interface") {
      validateInterface();
    }
    if (field === "nome3") {
      validateNome();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTypingStatus(true);

    try {
      const response = await formController.sendCadastro(setTypingStatus);
      console.log("Resposta da API /cadastrar:", response);

      if (response?.csv) {
        const blob = new Blob([response.csv], { type: "text/csv" });
        // const url = URL.createObjectURL(blob);

        sendMessageToChat(
          `📥 Download CSV`
        );
      } else {
        sendMessageToChat("⚠️ Erro ao gerar o CSV.");
      }
    } catch (error) {
      sendMessageToChat("⚠️ Erro ao cadastrar.");
    }
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
            <option value="capitalização">Capitalização</option>
            <option value="previdência">Previdência</option>
            <option value="saúde">Saúde</option>
            <option value="bare">Bare</option>
            <option value="canais digitais">Canais Digitais</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleDropdownChange} required disabled={!isFieldEnabled("estado")}>
            <option value="">Selecione...</option>
            <option value="em desenvolvimento">Em desenvolvimento</option>
            <option value="em produção">Em produção</option>
            <option value="em teste">Em teste</option>
          </select>
        </div>
        <div className={styles.row}>
          <label>Componente</label>
          <select name="componente" value={formData.componente} onChange={handleDropdownChange} required disabled={!isFieldEnabled("componente")}>
            <option value="">Selecione...</option>
            <option value="Back-end for Front-End">BFF: Back-end for Front-End</option>
            <option value="Service">SRV: Service</option>
            <option value="Front-end">FED: Front-end</option>
            <option value="Library">LIB: Library</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Tecnologia</label>
          <select name="tecnologia" value={formData.tecnologia} onChange={handleDropdownChange} required disabled={!isFieldEnabled("tecnologia")}>
            <option value="">Selecione...</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="Node">Node</option>
            <option value="SpringBoot">Springboot</option>
            <option value="Angular">Angular</option>
            <option value="Cobol">Cobol</option>
          </select>
        </div>
        <div className={styles.rowTriple}>
          <label>Nome</label>
          <div className={styles.flexDisplay}>
            <select name="nome1" value={formData.nome1} onChange={handleDropdownChange} required disabled={!isFieldEnabled("nome1")}>
              <option value="">Selecione...</option>
              {nome1Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select name="nome2" value={formData.nome2} onChange={handleDropdownChange} required disabled={!isFieldEnabled("nome2")}>
              <option value="">Selecione...</option>
              {nome2Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="nome3"
              value={formData.nome3}
              onChange={handleChange}
              onBlur={() => handleBlur("nome3")}
              required
              disabled={!isFieldEnabled("nome3")}
            />
          </div>
        </div>
        <div className={styles.rowFull}>
          <label>Fonte</label>
          <input
            type="text"
            name="fonte"
            value={formData.fonte}
            onChange={handleChange}
            onBlur={() => handleBlur("fonte")}
            required
            disabled={!isFieldEnabled("fonte")}
          />
        </div>

        <div className={styles.rowFull}>
          <label>Interface</label>
          <input type="text" name="interface" value={formData.interface} onChange={handleChange} onBlur={() => handleBlur("interface")} required disabled={!isFieldEnabled("interface")} />
        </div>

        <button type="submit" disabled={!isFieldEnabled("interface")}>Cadastrar</button>
      </form>
    </div>
  );
};

export default AddForm;
