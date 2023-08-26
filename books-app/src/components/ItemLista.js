import React from "react";
import "./ItemLista.css";

const ItemLista = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.titulo}</td>
      <td>{props.autor}</td>
      <td>{props.ano}</td>
      <td class="text-center">
        <img src={props.foto} alt="Capa do Livro" width="75"></img>
      </td>
    </tr>
  );
};

export default ItemLista;
