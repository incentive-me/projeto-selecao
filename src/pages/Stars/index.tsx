import { Container } from './styles';

export function Stars(): JSX.Element {
  return (
    <Container>
      <div>
        <img src="https://github.com/gustavocrvls.png" alt="Avatar" />
        <h2>Gustavo Carvalho Silva</h2>
        <h3>@gustavocrvls</h3>
        <p>
          Estudante de Sistemas de Informação na UNIFESSPA, Desenvolvedor Full
          Stack e aspirante a UX Designer.
        </p>
        <div> followers / following</div>
      </div>

      <div>
        <h1>Repositórios Salvos</h1>
        <ul>
          <li>Repo</li>
        </ul>
      </div>

      <div>
        <h2>Tags</h2>
        <ul>
          <li>Tag1</li>
        </ul>
      </div>
    </Container>
  );
}
