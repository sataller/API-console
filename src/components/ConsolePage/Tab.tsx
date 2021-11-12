import React from 'react';
import styled from 'styled-components';
import IndicatorIcon from './IndicatorIcon';
import optionsIcon from '../../assets/icons/dots.svg';
import SubMenu from './SubMenu';
import {copyResponse} from '../../utils/copyResponse';
import {useAppDispatch} from '../../hooks/redux';
import {removeAction, setActiveTub} from '../../store/reducers/requestReducer';

type TabPropsType = {
  id: string;
  isError: boolean;
  title: string;
  responseText: any;
  requestText: any;
  userName: string;
  setViewText: (requestText: string, responseText: string) => void;
  sendRequest: (id?: string) => void;
};

const Tab = ({userName, sendRequest, responseText, requestText, id, isError, title, setViewText}: TabPropsType) => {
  const dispatch = useAppDispatch();
  const [isVisibleSubMenu, setIsVisibleSubMenu] = React.useState(false);
  const [isVisibleToast, setIsVisibleToast] = React.useState(false);
  const [toastText, setToastText] = React.useState('Скопировано');

  React.useEffect(() => {

  }, []);

  const viewToast = (text: string) => {
    setToastText(text);
    setIsVisibleToast(true);
    setIsVisibleSubMenu(false);
    setTimeout(() => {
      setIsVisibleToast(false);
    }, 3000);
  };

  const viewSubMenu = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    setIsVisibleSubMenu(!isVisibleSubMenu);
  };

  const closeSubMenu = () => {
    if (isVisibleSubMenu) {
      setIsVisibleSubMenu(false);
    }
  };

  const deleteTab = () => {
    dispatch(removeAction({id}));
    setIsVisibleSubMenu(false);
  };

  const perform = async () => {
    openTab();
    await sendRequest(id);
    setIsVisibleSubMenu(false);
    console.log('perform');
  };

  const openTab = () => {
    dispatch(setActiveTub(+id));
    setViewText(JSON.stringify(requestText), responseText);
  };

  return (
    <TabBlock onClick={openTab} onMouseLeave={closeSubMenu}>
      <TabWrapper>
        <IndicatorIcon isError={isError} />
        {isVisibleToast && <Toast>{toastText}</Toast>}
        <Title>{title?.slice(0, 8) || 'no action'}</Title>
        {id !== '20' && <OptionsIcon src={optionsIcon} onClick={(e) => viewSubMenu(e)} />}
      </TabWrapper>
      {isVisibleSubMenu && (
        <SubMenu
          perform={perform}
          deleteTab={deleteTab}
          copy={(e) => copyResponse({e, id, viewToast, userName})}
        />
      )}
    </TabBlock>
  );
};

export default Tab;

const TabBlock = styled.div`
  position: relative;
  cursor: pointer;
`;

const OptionsIcon = styled.img`
  cursor: pointer;
`;

const Toast = styled.div`
  position: absolute;
  width: 90px;
  height: 20px;
  background: #f6f6f6;
  border-radius: 5px;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  padding: 0 10px;

  color: #0d0d0d;
  animation: det 1s linear;
  animation-delay: 2s;

  @keyframes det {
    from {
      opacity: 1;
      transform: translateY(0px);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  width: 120px;
  height: 30px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0 10px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin-left: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #0d0d0d;
`;
