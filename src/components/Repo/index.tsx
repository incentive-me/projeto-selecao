import { FiPlus, FiX } from 'react-icons/fi';
import { Container } from './styles';

export function Repo(): JSX.Element {
  return (
    <Container>
      <span>gustavocrvls / moveit</span>
      <h2>Move.it</h2>

      <ul>
        <li className="tag">
          <span>tag1</span>
          <button type="button">
            <FiX size="18" />
          </button>
        </li>
        <li className="new-tag">
          <button type="button">
            <FiPlus size="18" />
          </button>
        </li>
      </ul>
    </Container>
  );
}
