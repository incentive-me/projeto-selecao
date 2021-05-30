import { Container } from './styles';

export function UserProfile(): JSX.Element {
  return (
    <Container>
      <img src="https://github.com/gustavocrvls.png" alt="Avatar" />
      <h2>Gustavo Carvalho Silva</h2>
      <h3>@gustavocrvls</h3>
      <p>
        Estudante de Sistemas de Informação na UNIFESSPA, Desenvolvedor Full
        Stack e aspirante a UX Designer.
      </p>
      <div> followers / following</div>
    </Container>
  );
}
