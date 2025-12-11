import { useContext, useState } from 'react'
import './App.css'

import HomePage from './pages/HomePage/HomePage'
import { Routes, Route, Navigate } from 'react-router-dom'
import InfoPage from './pages/InfoPage/InfoPage.jsx'
import LoginPopup from './components/LogInPopup/LoginPopup.jsx'
import ChangePasswordPopup from './components/ChangePasswordPopup/ChangePasswordPopup.jsx'
import { ToastContainer } from 'react-toastify'
import ForgotPasswordPopup from './components/ForgotPasswordPopup/ForgotPasswordPopup.jsx'
import { Context } from './context/Context.js'
import CartPage from './pages/CartPage/CartPage.jsx'
import Add from './pages/Admin/Add/Add.jsx';
import List from './pages/Admin/List/List.jsx';
import Orders from './pages/Admin/Orders/Orders.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import CompleteOrder from './pages/PlaceOrder/CompleteOrder/CompleteOrder.jsx'
import CancelOrder from './pages/PlaceOrder/CancelOrder/CancelOrder.jsx'
import UserOrders from './pages/UserOrders/UserOrders.jsx'

import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import UserLayout from './layouts/UserLayout/UserLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Users from './pages/Admin/Users/Users.jsx'
import CookieBanner from './components/CookieBanner/CookieBanner.jsx'
import OrderCompleted from './pages/PlaceOrder/OrderCompleted/OrderCompleted.jsx'

function App() {

  const {showLogin, setShowLogin, cookieConsent} = useContext(Context);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  return (
    <>
      <ToastContainer />
      {
        showLogin ? <LoginPopup setShowLogin={setShowLogin} setShowForgotPassword={setShowForgotPassword}/> : null
      }
      {
        showChangePassword ? <ChangePasswordPopup setShowChangePassword={setShowChangePassword}/> : null
      }
      {
        showForgotPassword ? <ForgotPasswordPopup setShowForgotPassword={setShowForgotPassword}/> : null
      }
      {
        cookieConsent === false || cookieConsent === "rejected" ? <CookieBanner /> : null
      }
      <Routes>

        {/* USER ROUTES */}
        <Route element={<UserLayout 
          setShowChangePassword={setShowChangePassword} 
          setShowLogin={setShowLogin}
          />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/cart/place-order/:orderId' element={<PlaceOrder />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path='/checkout/complete/' element={<CompleteOrder />}/>
          <Route path='/checkout/cancel/' element={<CancelOrder />}/>
          <Route path='/order/completed' element={<OrderCompleted />}/>
          <Route path='/orders' element={<UserOrders />}/>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/add" element={<Add />} />
            <Route path="/admin/list" element={<List />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={["admin", "delivery"]}/>}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Orders />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
