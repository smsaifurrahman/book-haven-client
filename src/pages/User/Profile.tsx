/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useState } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { useChangePasswordMutation } from "../../redux/feature/user/user.api";

const { Title } = Typography;

const Profile = () => {
   const [changePassword, { isLoading }] = useChangePasswordMutation();
   const [form] = Form.useForm();
   const [confirmPasswordError, setConfirmPasswordError] = useState(false);

   const handleSubmit = async (values: any) => {
      if (values.newPassword !== values.confirmPassword) {
         setConfirmPasswordError(true);
         return;
      }

      setConfirmPasswordError(false);

      try {
         const response = await changePassword({
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
         }).unwrap();
         console.log(response);

         message.success(response?.message || "Password changed successfully!");
         form.resetFields();
      } catch (error: any) {
         message.error(error?.data?.message || "Failed to change password.");
      }
   };

   return (
      <div
         style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
         <Card
            style={{
               width: "100%",
               maxWidth: "400px",
               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
               borderRadius: "8px",
            }}
         >
            <Title
               level={3}
               style={{ textAlign: "center", marginBottom: "20px" }}
            >
               Change Password
            </Title>

            <Form
               form={form}
               layout="vertical"
               onFinish={handleSubmit}
               autoComplete="off"
            >
               {/* Current Password */}
               <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[
                     {
                        required: true,
                        message: "Please enter your current password!",
                     },
                  ]}
               >
                  <Input.Password placeholder="Enter current password" />
               </Form.Item>

               {/* New Password */}
               <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                     {
                        required: true,
                        message: "Please enter a new password!",
                     },
                     {
                        min: 6,
                        message: "Password must be at least 6 characters long!",
                     },
                  ]}
               >
                  <Input.Password placeholder="Enter new password" />
               </Form.Item>

               {/* Confirm Password */}
               <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  rules={[
                     {
                        required: true,
                        message: "Please confirm your new password!",
                     },
                  ]}
                  validateStatus={confirmPasswordError ? "error" : ""}
                  help={confirmPasswordError ? "Passwords do not match!" : ""}
               >
                  <Input.Password placeholder="Confirm new password" />
               </Form.Item>

               {/* Submit Button */}
               <Form.Item>
                  <Button
                     className="bg-indigo-500 text-white hover:bg-indigo-500"
                     htmlType="submit"
                     block
                     loading={isLoading}
                  >
                     Change Password
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </div>
   );
};

export default Profile;
