import React, { useState } from "react";
import styles from "./AddForm.module.css";

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    community: "",
    state: "",
    componentType: "",
    technology: "",
    name1: "",
    name2: "",
    name3: "",
    source: "",
    interface: "",
  });

  const isFieldEnabled = (field: string) => {
    const fieldsOrder = [
      "type", "description", "community", "state", "componentType", "technology",
      "name1", "name2", "name3", "source", "interface"
    ];
    const index = fieldsOrder.indexOf(field);
    if (index === 0) return true;
    return fieldsOrder.slice(0, index).every((key) => formData[key as keyof typeof formData] !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className={styles.rowFull}>
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required disabled={!isFieldEnabled("description")} />
        </div>

        <div className={styles.row}>
          <label>Comunidade</label>
          <select name="community" value={formData.community} onChange={handleChange} required disabled={!isFieldEnabled("community")}>
            <option value="">Selecione...</option>
            <option value="capitalizacao">Capitalização</option>
            <option value="previdencia">Previdência</option>
            <option value="saude">Saúde</option>
            <option value="bare">Bare</option>
            <option value="canais-digitais">Canais Digitais</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Estado</label>
          <select name="state" value={formData.state} onChange={handleChange} required disabled={!isFieldEnabled("state")}>
            <option value="">Selecione...</option>
            <option value="desenvolvimento">Em desenvolvimento</option>
            <option value="producao">Em produção</option>
            <option value="teste">Em teste</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Componente</label>
          <select name="componentType" value={formData.componentType} onChange={handleChange} required disabled={!isFieldEnabled("componentType")}>
            <option value="">Selecione...</option>
            <option value="bff">BFF: Back-end for Front-End</option>
            <option value="srv">SRV: Service</option>
            <option value="fed">FED: Front-end</option>
            <option value="lib">LIB: Library</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Tecnologia</label>
          <select name="technology" value={formData.technology} onChange={handleChange} required disabled={!isFieldEnabled("technology")}>
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

        <div className={styles.row}>
          <label>Fonte</label>
          <input type="text" name="source" value={formData.source} onChange={handleChange} required disabled={!isFieldEnabled("source")} />
        </div>

        <div className={styles.row}>
          <label>Interface</label>
          <input type="text" name="interface" value={formData.interface} onChange={handleChange} required disabled={!isFieldEnabled("interface")} />
        </div>

        <button type="submit" disabled={!isFieldEnabled("interface")}>Cadastrar</button>
      </form>
    </div>
  );
};

export default AddForm;
