import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout({setShowLogin, setShowChangePassword}) {
  return (
    <>
      <Navbar 
        setShowChangePassword={setShowChangePassword} 
        setShowLogin={setShowLogin}
      />
      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
