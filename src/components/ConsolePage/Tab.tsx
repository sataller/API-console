import React from 'react';
import styled from 'styled-components';
import IndicatorIcon from './IndicatorIcon';
import optionsIcon from '../../assets/icons/dots.svg';

const Tab = () => {
  const [isVisibleSubMenu, setIsVisibleSubMenu] = React.useState(false);
  const [isVisibleToast, setIsVisibleToast] = React.useState(false);
  const copy = () => {
    setIsVisibleToast(true);
    setIsVisibleSubMenu(false);
    setTimeout(() => {
      setIsVisibleToast(false);
    }, 3000);
  };

  const viewSubMenu = () => {
    setIsVisibleSubMenu(!isVisibleSubMenu);
  };

  const deleteTab = () => {
    console.log('delete');
    setIsVisibleSubMenu(!isVisibleSubMenu);
  }

  return (
    <TabBlock>
      <TabWrapper>
        <IndicatorIcon />
        {isVisibleToast && <Toast>Скопировано</Toast>}
        <Title>
          track.get
        </Title>
        <img src={optionsIcon} onClick={viewSubMenu} />
      </TabWrapper>
      {isVisibleSubMenu
      && <SubMenu>
        <SubMenuOption normal>Выполнить</SubMenuOption>
        <SubMenuOption normal onClick={copy}>Скопировать</SubMenuOption>
        <SubMenuOptionHr></SubMenuOptionHr>
        <SubMenuOption onClick={deleteTab}>Удалить</SubMenuOption>
      </SubMenu>}
    </TabBlock>
  );
};

export default Tab;

const TabBlock = styled.div`
  position: relative;
`;

const SubMenuOptionHr = styled.hr`
  width: 100%;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const SubMenuOption = styled.div<{normal?: boolean}>`
  width: 100%;
  height: 45px;
  padding: 10px 15px;
  //border-top: 1px solid black;
  &:hover {
    background-color: ${props => props.normal ? '#0055FB' : '#CF2C00'};
  }
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  position: absolute;
  width: 133px;

  background: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

const Toast = styled.div`
  position: absolute;
  width: 90px;
  height: 20px;
  background: #F6F6F6;
  border-radius: 5px;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  padding: 0 10px;

  color: #0D0D0D;
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
  background: #FFFFFF;
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
  color: #0D0D0D;
`;