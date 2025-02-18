import { Button, Layout, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/feature/auth/authSlice";

const { Header, Content } = Layout;

const DashboardLayout = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleLogOut = () => {
      dispatch(logout());
      message.info("Logging out... Redirecting to home page");
      navigate('/');
   };

   return (
      <Layout style={{ height: "100%" }}>
         <Sidebar></Sidebar>
         <Layout>
            <Header className="flex justify-end pr-4">
               <Button onClick={handleLogOut} className="bg-blue-500 text-white hover:bg-blue-600 mt-4">
                  Logout
               </Button>
            </Header>

            <Content style={{ margin: "24px 16px 0" }}>
               <div
                  style={{
                     padding: 24,
                     minHeight: 360,
                  }}
               >
                  <Outlet />
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default DashboardLayout;
