import React from 'react';
import { Badge as AntdBadge, BadgeProps as AntBadgeProps } from 'antd';
import { NotificationType } from '../Notification/Notification';
import * as S from './Badge.styles';

export const { Ribbon } = AntdBadge;

interface BadgeProps extends AntBadgeProps {
  className?: string;
  severity?: NotificationType;
}

export const Badge: React.FC<BadgeProps> = ({ className, severity, children, ...props }) => (
  <S.Badge className={className} {...(severity && { severity })} {...props}>
    {children}
  </S.Badge>
);
