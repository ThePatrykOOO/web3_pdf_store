import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { Typography } from 'antd';
import styled from 'styled-components';

export const Title = styled(Typography.Text)`
  font-weight: ${FONT_WEIGHT.bold};

  font-size: ${FONT_SIZE.lg};
`;
