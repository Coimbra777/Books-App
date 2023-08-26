import React from "react";
import "./ItemLista.css";

const ItemLista = ({ id, titulo, autor, ano, foto, excluirClick }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{titulo}</td>
      <td>{autor}</td>
      <td>{ano}</td>
      {/* <td>
        <img src={foto} alt="Capa do Livro" width="75" />
      </td> */}
      <td>
        <i
          className="excluir text-danger"
          fw-bold
          title="Excluir"
          onClick={excluirClick}
        >
          &#10008;
        </i>
      </td>
    </tr>
  );
};

export default ItemLista;
