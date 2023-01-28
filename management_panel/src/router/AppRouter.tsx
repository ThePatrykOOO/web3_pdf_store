import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Error404Page from "../pages/Errors/Error404Page";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import RequireAuth from "./RequireAuth";
import Dashboard from "../layout/Dashboard";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UserListPage from "../pages/Users/UserListPage";

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          {/*<Route path="sign-up" element={<SignUpPage />} />*/}
        </Route>
        <Route path="/" element={protectedLayout}>
          <Route index element={<DashboardPage />} />
          <Route path="/users" element={<UserListPage />}>
            {/*<Route path="create" element={<AdvancedForm />} />*/}
            {/*<Route path=":id" element={<AdvancedForm />} />*/}
          </Route>
          {/*<Route path="/products" element={<DataTables />}>*/}
          {/*  <Route path="create" element={<AdvancedForm />} />*/}
          {/*  <Route path=":id" element={<AdvancedForm />} />*/}
          {/*</Route>*/}
        </Route>
        {/*<Route path="/logout" element={<LogoutFallback />} />*/}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
