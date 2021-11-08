import React, {Dispatch, SetStateAction, useState} from 'react';
import Logo from '../reusibleComponents/Logo';
import LogoutButton from '../reusibleComponents/LogoutButton';
import {FullScreenButton} from '../reusibleComponents/FullScreanButton';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {logOut} from '../../api/api';

export type ConsoleHeaderPropsType = {
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  isFullScreen: boolean;
};

const ConsoleHeader = ({setIsFullScreen, isFullScreen}: ConsoleHeaderPropsType) => {
  const [value, setValue] = useState('iamyourlogin@domain.xyz : Sublogin');
  const history = useHistory();
  const onLogoutClick = () => {
    history.push(`/login`);
    logOut();
  };
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Header>
      <HeaderItem>
        <Logo />
        <Title>API-консолька</Title>
      </HeaderItem>
      <HeaderItem>
        <UserInfo onChange={handleChange} value={value} disabled />
        <LogoutButton onLogoutClick={onLogoutClick} />
        <FullScreenButton setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen} />
      </HeaderItem>
    </Header>
  );
};

export default ConsoleHeader;

const Header = styled.div`
  padding: 10px 15px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f6f6f6;
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;

  margin-left: 20px;
  color: #0d0d0d;
`;

const UserInfo = styled.input`
  appearance: unset;
  max-width: 280px;
  height: 40px;
  padding: 6px 10px;
  cursor: pointer;
  background: #ffffff;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: 2px solid rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
`;
