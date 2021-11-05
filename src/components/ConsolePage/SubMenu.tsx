import React from 'react';
import styled from 'styled-components';

type SubMenuPropsType = {
  copy: () =>void
  deleteTab: () =>void
  perform: () =>void
}

const SubMenu = ({copy, deleteTab, perform}:SubMenuPropsType) => {
  return (
    <SubMenuWrapper>
      <SubMenuOption normal onClick={perform}>Выполнить</SubMenuOption>
      <SubMenuOption normal onClick={copy}>Скопировать</SubMenuOption>
      <SubMenuOptionHr/>
      <SubMenuOption onClick={deleteTab}>Удалить</SubMenuOption>
    </SubMenuWrapper>
  );
};

export default SubMenu;

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

const SubMenuWrapper = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  width: 133px;

  background: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;