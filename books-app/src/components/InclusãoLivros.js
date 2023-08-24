import { useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

const InclusãoLivros = () => {
  // define os nomes dos campos do form
  const { register, handleSubmit, reset } = useForm();

  const [aviso, setAviso] = useState("");

  // método chamado ao enviar o form
  const salvar = async (campos) => {
    try {
      const response = await inAxios.post("livros", campos);
      setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
    } catch (error) {
      setAviso(`Erro... Livro não cadastrado: ${error}`);
    }

    // executa o comando após o tempo indicado
    setTimeout(() => {
      setAviso("");
    }, 5000);

    reset({ titulo: "", autor: "", foto: "", ano: "" });
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão</h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            autoFocus
            {...register("titulo")}
          ></input>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            required
            {...register("autor")}
          ></input>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="ano">Ano de Publicação:</label>
          <input
            type="number"
            className="form-control"
            id="ano"
            required
            {...register("ano")}
          ></input>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="foto">URL da foto:</label>
          <input
            type="url"
            className="form-control"
            id="foto"
            required
            {...register("foto")}
          ></input>
        </div>

        <input
          type="submit"
          className="btn btn-primary mt-3"
          value="Enviar"
        ></input>
        <input
          type="reset"
          className="btn btn-danger mt-3 ms-3"
          value="Limpar"
        ></input>
      </form>
      <div
        className={
          aviso.startsWith("Ok!")
            ? "alert alert-sucess"
            : aviso.startsWith("Erro")
            ? "alert alert-danger"
            : ""
        }
      >
        {aviso}
      </div>
    </div>
  );
};

export default InclusãoLivros;
