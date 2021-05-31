import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    display: flex;
    align-items: center;
  }

  .repos-container {
    overflow: auto;
    max-height: calc(100vh - 200px);
  }
`;
