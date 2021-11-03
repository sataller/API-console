import React, {useState} from 'react';
import {logOut} from '../../api/api';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../reusibleComponents/Logo';
import logoutIcon from '../../assets/icons/log-out.svg';
import fullScreenIcon from '../../assets/icons/full-screen.svg';

const Console = () => {

  const [value, setValue] = useState('iamyourlogin@domain.xyz : Sublogin');
  const history = useHistory();
  const onLogoutClick = () => {
    history.push(`/login`);
    logOut();
  };
  const handleChange = (e: any) => {
    setValue(e.turget.value);
  };


  return (
    <Wrapper>

      <Header>
        <HeaderItem>
          <Logo />
          <Title>API-консолька</Title>
        </HeaderItem>
        <HeaderItem>
          <UserInfo onChange={handleChange} value={value} />
          <LogoutButton>
            Выход
            <LogoutIcon src={logoutIcon} />
          </LogoutButton>
          <FullScreenIcon src={fullScreenIcon} />
        </HeaderItem>
      </Header>
      {/*Console*/}
      {/*<button onClick={onLogoutClick}>jagsfjhghjdgf</button>*/}
    </Wrapper>
  );
};

export default Console;

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 870px;
  background: #693535;
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  padding: 10px 15px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F6F6F6;
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
  color: #0D0D0D;
`;

const UserInfo = styled.input`
  appearance: unset;
  max-width: 280px;
  height: 40px;
  padding: 6px 10px;

  background: #FFFFFF;

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

const LogoutButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: unset;
  margin-left: 35px;
  padding: 0;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  display: flex;
  align-items: center;

  color: #0D0D0D;

  &:active {
    color: #0055FB;
  }
`;

const LogoutIcon = styled.img`
  margin-left: 10px;
  width: 16px;
  height: 18px;
`;

const FullScreenIcon = styled.img`
  cursor: pointer;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 0 30px;
`;
