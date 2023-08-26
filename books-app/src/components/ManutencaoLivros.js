import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import ItemLista from "./ItemLista";
import { useForm } from "react-hook-form";

const ManutencaoLivros = () => {
  const { register, handleSubmit, reset } = useForm();
  const [livros, setLivro] = useState([]);

  const filtrarLista = async (campos) => {
    try {
      const lista = await inAxios.get(`livros/filtro/${campos.palavra}`);
      lista.data.lenght
        ? setLivro(lista.data)
        : alert("Não há livros com a palavra-chave pesquisada");
    } catch (error) {
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  const obterLista = async () => {
    try {
      const lista = await inAxios.get("livros");
      setLivro(lista.data);
    } catch (error) {
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  useEffect(() => {
    obterLista();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="fst-italic mt-3">Manutenção</h4>
        </div>
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(filtrarLista)}>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Título ou autor"
                required
                {...register("palavra")}
              />
              <input
                type="submit"
                className="btn btn-primary"
                value="Pesquisar"
              />
              <input type="button" className="btn btn-danger" value="Todos" />
            </div>
          </form>
        </div>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Cód.</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <ItemLista
              key={livro.id}
              id={livro.id}
              titulo={livro.titulo}
              autor={livro.autor}
              foto={livro.foto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManutencaoLivros;
