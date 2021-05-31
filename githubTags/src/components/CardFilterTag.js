import React from "react";
import styled from "styled-components";

const CardFilterTag = ({ setInputSearch }) => {
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const blockSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={blockSubmit}>
      <input
        required
        onChange={handleInputSearch}
        placeholder={"busque por tags cadastrada..."}
      />
    </Form>
  );
};

export default CardFilterTag;

const Form = styled.form`
  grid-column: 1/-1;
  grid-row: 1;
  position: sticky;
  top: 0;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  z-index: 1;

  input {
    height: 70%;
    width: 58%;
    padding: 8px;
  }
`;
