import React from 'react';
import { Row, Typography } from 'antd';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useResponsive } from '@app/hooks/useResponsive';

const DashboardPage: React.FC = () => {
  const { isDesktop } = useResponsive();

  const desktopLayout = (
    <Row>
      <Typography.Title level={3} style={{ margin: 20 }}>
        Desktop Management Panel
      </Typography.Title>
    </Row>
  );

  const mobileAndTabletLayout = (
    <Row gutter={[20, 24]}>
      <Typography.Title level={3} style={{ margin: 10 }}>
        Mobile Management Panel
      </Typography.Title>
    </Row>
  );

  return (
    <>
      <PageTitle>NFT Dashboard</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default DashboardPage;
