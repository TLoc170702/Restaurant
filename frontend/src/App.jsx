import axios from "./util/axios.customize"
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";

import './App.css'

import HomePage from './Pages/HomePage'
import Rooms from "./Pages/Rooms/Rooms";
import SuitRoom from './Pages/SuitRoom/SuitRoom';
import SuperiorRoom from './Pages/SuperiorRoom/SuperiorRoom'
import QueenRoom from './Pages/QueenRoom/QueenRoom'

import LoginPage from './Pages/LoginPage/Login'
import RegisterPage from './Pages/RegisterPage/Register'

import Info from './Pages/InfomationPage/Info'

import Users from './AdminPage/User'
import AddUsers from './AdminPage/AddUser'
import RoomsAdmin from './AdminPage/Room'
import AddRooms from './AdminPage/AddRoom'
import EditRooms from './AdminPage/EditRoom'
import Offers from './AdminPage/Offer'
import AddOffers from './AdminPage/AddOffer'
import EditOffers from './AdminPage/EditOffer'
import Staffs from './AdminPage/Staff'
import Addstaffs from './AdminPage/AddStaff'
import EditStaffs from './AdminPage/EditStaff'
import Feedbacks from './AdminPage/Feedback'
import AddFeedbacks from './AdminPage/AddFeedback'
import EditFeedbacks from './AdminPage/Editfeedback'
import AdminLogin from './AdminPage/AdminLogin'

import Settings from './AdminPage/Setting'

import Orders from './AdminPage/Order'
import ConfirmOrder from './AdminPage/ConfirmOrder'

import Admin from './AdminPage/Index'

import { AuthContext } from "./Components/context/auth.context";


function App() {

  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext)

  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("access_token"); // Kiểm tra token trong localStorage
      if (!token) {
        // Nếu không có token, cập nhật trạng thái auth
        setAuth({
          isAuthenticated: false,
          user: {
            email: "",
            username: "",
          },
        });
        setAppLoading(false);
        return;
      }

      else {
        setAppLoading(true);
        const res = await axios.get(`/v1/api/account`);
        if (res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              username: res.username
            }
          })
        }
        setAppLoading(false);
      }
    }

    fetchAccount()
  }, [])


  return (
    <>
      {appLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translateAliases(-50%, -50%)"
        }}>
          <Spin />
        </div>

        :

        <>
          <Routes>

            {/* User router:  */}
            <Route path="/" element={<HomePage />} />

            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />

            <Route path="/info" element={<Info />} />

            <Route path="/Room" element={<Rooms />} />
            {/* <Route path="/SuperiorRoom" element={<SuperiorRoom />} />
            <Route path="/QueenRoom" element={<QueenRoom />} /> */}
            <Route path="/room/:id" element={<SuitRoom />} />

            {/* Admin router: */}

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/adduser" element={<AddUsers />} />

            <Route path="/admin/rooms" element={<RoomsAdmin />} />
            <Route path="/admin/addroom" element={<AddRooms />} />
            <Route path="/admin/editroom/:id" element={<EditRooms />} />

            <Route path="/admin/offer" element={<Offers />} />
            <Route path="/admin/addoffer" element={<AddOffers />} />
            <Route path="/admin/editoffer/:id" element={<EditOffers />} />

            <Route path="/admin/staff" element={<Staffs />} />
            <Route path="/admin/addstaff" element={<Addstaffs />} />
            <Route path="/admin/editstaff/:id" element={<EditStaffs />} />

            <Route path="/admin/feedback" element={<Feedbacks />} />
            <Route path="/admin/addfeedback" element={<AddFeedbacks />} />
            <Route path="/admin/editfeedback/:id" element={<EditFeedbacks />} />

            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/confirmorder/:id" element={<ConfirmOrder />} />

            <Route path="/admin/order" element={<Orders />} />

            <Route path="/admin/login" element={<AdminLogin />} />


          </Routes>
        </>
      }

    </>
  )
}


export default App
