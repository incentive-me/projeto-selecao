import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const RepositoryCard = ({ props }) => {
  return (
    <div>
      {props.map((el) => (
        <S.Card key={el.id}>
          <h1>Project Name: {el.name}</h1>
          <p>Project id: {el.id}</p>
          <p>Description: {el.description}</p>
          <a href={el.html_url}>
            Link project
          </a>
        </S.Card>
      ))}
    </div>
  )
};

RepositoryCard.propTypes = {
  map: PropTypes.func,
  props: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
};
RepositoryCard.defaultProps = {
  map: PropTypes.func,
  props: PropTypes.object,
};

export default RepositoryCard;

/*console.log('reponse',props)
  return (
    <>
      
    </>*/