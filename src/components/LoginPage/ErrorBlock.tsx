import React from 'react';
import {SubTitle, Error} from './LoginStyles';
import errorIcon from '../../assets/icons/error-icon.svg';

const ErrorBlock = ({errorText}:{errorText:string}) => {
  return (
    <Error>
      <SubTitle>
        <img src={errorIcon} alt={'error icon'}/>
        Вход не вышел
      </SubTitle>
      <span>{errorText}</span>
    </Error>
  );
};

export default ErrorBlock;