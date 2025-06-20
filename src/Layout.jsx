import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;