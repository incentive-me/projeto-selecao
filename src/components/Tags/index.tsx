import { Container } from './styles';

export function Tags(): JSX.Element {
  return (
    <Container>
      <h2>Tags</h2>
      <ul>
        <li>Tag1</li>
        <li className="active">Tag2</li>
        <li>Tag3</li>
        <li>Tag4</li>
      </ul>
    </Container>
  );
}
