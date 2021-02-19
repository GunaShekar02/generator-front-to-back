import React from "react";

import styles from "./Home.module.css";

import Button from "../../Components/Button";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Home Component</h1>
      <Button title="Sample Button" />
    </div>
  );
};

export default Home;
