import React from 'react';
import {LogoStyled} from '../LoginPage/LoginStyles';
import logo from '../../assets/icons/logo.svg';

const Logo = () => {
  return (
    <LogoStyled src={logo} alt='logo' />
  );
};

export default Logo;