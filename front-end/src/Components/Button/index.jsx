import React from 'react';
import PropTypes from 'prop-types';
import SButton from './style';

const Button = ({
  disabled, onClick, children, color, txtColor, dataTestId, id,
}) => (
  <SButton
    id={id}
    data-testid={dataTestId}
    type="button"
    disabled={disabled}
    onClick={onClick}
    style={{ backgroundColor: color, color: txtColor }}
  >
    { children }
  </SButton>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.string,
  txtColor: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
};

Button.defaultProps = {
  // eslint-disable-next-line no-console
  onClick: () => console.log('click'),
  disabled: false,
  children: 'Acessar',
  color: '',
  txtColor: '',
  dataTestId: '',
  id: '',
};

export default Button;