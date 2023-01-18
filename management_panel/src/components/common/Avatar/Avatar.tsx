import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import * as S from './Avatar.styles';

export const { Group } = AntdAvatar;

export const Avatar: React.FC<AvatarProps> = (props) => {
  return <S.Avatar {...props} />;
};
