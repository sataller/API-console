import React from 'react';
import styled from 'styled-components';
import IndicatorIcon from './IndicatorIcon';
import optionsIcon from '../../assets/icons/dots.svg';
import SubMenu from './SubMenu';

const Tab = () => {
  const [isVisibleSubMenu, setIsVisibleSubMenu] = React.useState(false);
  const [isVisibleToast, setIsVisibleToast] = React.useState(false);

  const copy = () => {
    navigator.clipboard
      .writeText('Hello Alligator! yra')
      .then(() => {
        console.log('copied');
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });

    setIsVisibleToast(true);
    setIsVisibleSubMenu(false);
    setTimeout(() => {
      setIsVisibleToast(false);
    }, 3000);
  };

  const viewSubMenu = () => {
    setIsVisibleSubMenu(!isVisibleSubMenu);
  };

  const closeSubMenu = () => {
    if (isVisibleSubMenu) {
      setIsVisibleSubMenu(false);
    }
  };

  const deleteTab = () => {
    console.log('delete');
    setIsVisibleSubMenu(false);
  };

  const perform = () => {
    setIsVisibleSubMenu(false);
    console.log('perform');
  };

  return (
    <TabBlock onMouseLeave={closeSubMenu}>
      <TabWrapper>
        <IndicatorIcon />
        {isVisibleToast && <Toast>Скопировано</Toast>}
        <Title>track.get</Title>
        <OptionsIcon src={optionsIcon} onClick={viewSubMenu} />
      </TabWrapper>
      {isVisibleSubMenu && <SubMenu perform={perform} deleteTab={deleteTab} copy={copy} />}
    </TabBlock>
  );
};

export default Tab;

const TabBlock = styled.div`
  position: relative;
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
