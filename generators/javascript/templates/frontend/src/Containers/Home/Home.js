import React from "react";
<% if (redux) { %>
import {useSelector} from "react-redux";
<% } %>
import styles from "./Home.module.css";

import Button from "../../Components/Button";

const Home = () => {
  <% if (redux) { %>
  const exampleState = useSelector(state => state.example.exampleState);
  <% } %>
  return (
    <div className={styles.container}>
      <h1>Home Component</h1>
      <% if (redux) { %>
      <span>Example State Value : {exampleState}</span>
      <% } %>
      <Button title="Sample Button" />
    </div>
  );
};

export default Home;
