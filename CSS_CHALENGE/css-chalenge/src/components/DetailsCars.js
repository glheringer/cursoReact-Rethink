import React from "react";
import styles from "./Details.module.css";

const DetailsCars = ({ marca, ano, modelo }) => {
  return (
    <div>
      <h1>O Modelo do carro é: {modelo}</h1>
      <p>A marca do carro é: {marca}</p>
      <p>E o ano do carro é: {ano}</p>
    </div>
  );
};

export default DetailsCars;
