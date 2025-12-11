import Header from '../../components/Admin/Header/Header'
import SideBar from '../../components/Admin/Sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin">
        <Header />
        <div className="admin-content">
            <SideBar />
            <Outlet />
        </div>
    </div>
  );
}
