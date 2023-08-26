import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import ItemLista from "./ItemLista";
import { useForm } from "react-hook-form";

const ManutencaoLivros = () => {
  const { register, handleSubmit, reset } = useForm();
  const [livros, setLivros] = useState([]);

  const filtrarLista = async (campos) => {
    try {
      const lista = await inAxios.get(`livros/filtro/${campos.palavra}`);
      lista.data.length
        ? setLivros(lista.data)
        : alert("Não há livros com a palavra-chave pesquisada");
    } catch (error) {
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  const obterLista = async () => {
    try {
      const lista = await inAxios.get("livros");
      setLivros(lista.data);
    } catch (error) {
      alert(`Erro... Não foi possível obter os dados: ${error}`);
    }
  };

  const excluir = async (id, titulo) => {
    if (!window.confirm(`Confirma a exclusão do livro "${titulo}" ? `)) {
      return;
    }
    try {
      await inAxios.delete(`livros/${id}`);
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (error) {
      alert(`Erro ... Não foi possível excluir esse livro : ${error}`);
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
              <input
                type="button"
                className="btn btn-danger"
                value="Todos"
                onClick={() => {
                  reset({ palavra: "" });
                  obterLista();
                }}
              />
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
            <th>ano</th>
            {/* <th>Foto</th> */}
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
              ano={livro.ano}
              // foto={livro.foto}
              excluirClick={() => excluir(livro.id, livro.titulo)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManutencaoLivros;
