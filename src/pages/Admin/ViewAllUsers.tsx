/** @format */

import { Table, Button, Skeleton, Tag, notification, Pagination } from "antd"; // Import Tag for role display
import {
   useBlockUserMutation,
   useGetAllUsersQuery,
} from "../../redux/feature/admin/admin.api";
import { TQueryParams } from "../../types/global";
import { useState } from "react";

const ViewAllUsers = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
   const { data, isLoading } = useGetAllUsersQuery(params);
   const [blockUser] = useBlockUserMutation();

   const handlePageChange = (page: number) => {
      setCurrentPage(page); // Update current page
      console.log("page", page);

      // Preserve previous filters while updating the page number
      const queryParams: TQueryParams[] = [
         { name: "page", value: page.toString() }, // Update page number
      ];

      setParams(queryParams);
   };

   const handleBlockUser = (userId: string) => {
      console.log(userId);
      blockUser(userId).then(() => {
         notification.success({
            message: "User Deactivated",
            description: "The user has been successfully deactivated.",
            placement: "topRight", // You can adjust the position
         });
      });
   };

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
      },
      {
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
      },
      {
         title: "Role",
         dataIndex: "role",
         key: "role",
         render: (role) => (
            <Tag color={role === "admin" ? "geekblue" : "green"}>
               {role.toUpperCase()}
            </Tag>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (_, record) => {
            const isBlocked = record.isBlocked;
            return (
               <Button
                  onClick={() => handleBlockUser(record._id)}
                  danger
                  disabled={isBlocked}
               >
                  {isBlocked ? "Deactivated" : "Deactivate"}
               </Button>
            );
         },
      },
   ];

   return (
      <div>
         <h2 className="text-2xl text-center mb-2">All Users</h2>
         <div className="min-h-[60vh]">
            {isLoading ? (
               <Skeleton />
            ) : (
               <Table
                  dataSource={data?.data?.data}
                  columns={columns}
                  rowKey="_id" // Ensure to use the correct key based on your data structure
                  pagination={false}
               />
            )}
         </div>
         {/* Pagination */}
         <div className=" flex justify-center ">
            <Pagination
               current={currentPage}
               total={data?.meta?.totalCount}
               pageSize={4}
               onChange={handlePageChange}
               showSizeChanger={false}
               hideOnSinglePage={true}
            />
         </div>
       
      </div>
   );
};

export default ViewAllUsers;
