// components/ProtectedLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
