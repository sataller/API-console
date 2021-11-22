import React from 'react';
import styled from 'styled-components';

type SubMenuPropsType = {
  copy: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  deleteTab: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  perform: () => void;
  margin: number;
};

const SubMenu = ({margin, copy, deleteTab, perform}: SubMenuPropsType) => {
  return (
    <SubMenuWrapper margin={margin}>
      <SubMenuOption normal onClick={perform}>
        Выполнить
      </SubMenuOption>
      <SubMenuOption normal onClick={copy}>
        Скопировать
      </SubMenuOption>
      <SubMenuOptionHr />
      <SubMenuOption onClick={(e) => deleteTab(e)}>Удалить</SubMenuOption>
    </SubMenuWrapper>
  );
};

export default SubMenu;

const SubMenuOptionHr = styled.hr`
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const SubMenuOption = styled.div<{normal?: boolean}>`
  width: 100%;
  height: 45px;
  padding: 10px 15px;

  &:hover {
    background-color: ${(props) => (props.normal ? '#0055FB' : '#CF2C00')};
  }
`;

const SubMenuWrapper = styled.div<{margin: number}>`
  position: absolute;
  right: ${(props) => props.margin}px;
  z-index: 2;
  flex-direction: column;
  padding: 5px 0;
  cursor: pointer;
  width: 133px;

  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;
