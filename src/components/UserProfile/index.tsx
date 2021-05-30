import { FiStar, FiUsers } from 'react-icons/fi';
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
      <div className="profile-social">
        <FiUsers size="16" />
        <div>
          <strong>44</strong>
          <span>followers</span>
        </div>

        <span>•</span>

        <div>
          <strong>44</strong>
          <span>following</span>
        </div>

        <span>•</span>

        <div>
          <FiStar size="16" />
          <strong>44</strong>
        </div>
      </div>
    </Container>
  );
}
