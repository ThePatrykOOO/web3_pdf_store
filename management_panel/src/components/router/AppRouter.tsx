import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import DashboardPage from '@app/pages/DashboardPages/DashboardPage';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));

const DataTablesPage = React.lazy(() => import('@app/pages/DataTablesPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const AdvancedFormsPage = React.lazy(() => import('@app/pages/AdvancedFormsPage'));
const PersonalInfoPage = React.lazy(() => import('@app/pages/PersonalInfoPage'));

export const DASHBOARD_PATH = '/';
export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/';

const Dashboard = withLoading(DashboardPage);
const AdvancedForm = withLoading(AdvancedFormsPage);

const DataTables = withLoading(DataTablesPage);

const AuthLayoutFallback = withLoading(AuthLayout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path={DASHBOARD_PATH} element={protectedLayout}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<DataTables />}>
            <Route path="create" element={<AdvancedForm />} />
            <Route path=":id" element={<AdvancedForm />} />
          </Route>
          <Route path="/products" element={<DataTables />}>
            <Route path="create" element={<AdvancedForm />} />
            <Route path=":id" element={<AdvancedForm />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
