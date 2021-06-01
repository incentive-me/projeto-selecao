import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const Input = ({
  type, onChange, name, value, color, placeholder,
}) => (
  <S.Container type={type}>
    <S.Text>{ name }</S.Text>
    <S.Input
      placeholder={placeholder}
      color={color}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
    />
  </S.Container>
);

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  color: PropTypes.string,
};
Input.defaultProps = {
  type: '',
  name: '',
  placeholder: '',
  value: PropTypes.object,
  color: '',
  onChange: PropTypes.func,
};

export default Input;
