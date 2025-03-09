import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src="/images/logo-white.png" alt="BRSA Logo" className={styles.logo} />
      <h1>BSRA - Cadastro de Ativos</h1>
    </header>
  );
};

export default Header;
