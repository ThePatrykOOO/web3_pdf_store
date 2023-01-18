import { Collapse as AntdCollapse, CollapseProps } from 'antd';
import * as S from './Collapse.styles';

export const { Panel } = AntdCollapse;

export const Collapse: React.FC<CollapseProps> = (props) => {
  return <S.Collapse {...props} />;
};
