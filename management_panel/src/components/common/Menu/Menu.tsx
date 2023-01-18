import React from 'react';
import { Menu as AntdMenu, MenuProps } from 'antd';
import * as S from './Menu.styles';

export const { Item: MenuItem } = AntdMenu;

export const SubMenu = AntdMenu.SubMenu;

export const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  return <S.Menu {...props}>{children}</S.Menu>;
};
