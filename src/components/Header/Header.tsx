import React, {Dispatch, SetStateAction, useState} from 'react';
import Logo from '../reusibleComponents/Logo';
import LogoutButton from '../reusibleComponents/LogoutButton';
import {FullScreenButton} from './FullScreanButton';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logout} from '../../store/reducers/authReducer';
import {Constants} from '../../constants';
import HistoryButton from './HistoryButton';
import GoBackButton from './GoBackButton';
import {PathName} from '../MainPageWrapper/MainPageWrapper';

export type ConsoleHeaderPropsType = {
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  isFullScreen: boolean;
};

const Header = ({setIsFullScreen, isFullScreen}: ConsoleHeaderPropsType) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const [value, setValue] = useState('iamyourlogin@domain.xyz : Sublogin');
  const [pathName, setPathName] = React.useState<string>(PathName.console);
  const history = useHistory();

  React.useEffect(() => {
    setPathName(history.location.pathname);
  }, [history.location.pathname]);

  React.useEffect(() => {
    setValue(`${user.login} ${user.sublogin ? `: ${user.sublogin}` : ''}`);
  }, [user.login, user.sublogin]);

  const onLogoutClick = () => {
    history.push(`/login`);
    dispatch(logout());
  };

  const onHistoryClick = () => {
    history.push(`/history`);
  };

  const goBackClick = () => {
    history.push(`/console`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <HeaderWrapper>
      <HeaderItem>
        <Logo />
        <Title>{Constants.AppTitle}</Title>
      </HeaderItem>
      <HeaderItem>
        {pathName === PathName.console ? (
          <HistoryButton onClick={onHistoryClick} title={Constants.History} />
        ) : (
          <GoBackButton onClick={goBackClick} title={Constants.GoBack} />
        )}
        <UserInfo onChange={handleChange} value={value} disabled />
        <LogoutButton title={Constants.Logout} onLogoutClick={onLogoutClick} />
        <FullScreenButton setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen} />
      </HeaderItem>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
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
