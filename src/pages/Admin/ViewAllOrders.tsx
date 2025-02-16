/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { Pagination, Table, Tag } from "antd";
import { useGetAllOrdersQuery } from "../../redux/feature/order/order";
import { useState } from "react";
import { TQueryParams } from "../../types/global";

const ViewAllOrders = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);

   const { data, isLoading } = useGetAllOrdersQuery(params);

   const handlePageChange = (page: number) => {
      setCurrentPage(page); // Update current page
      console.log("page", page);

      // Preserve previous filters while updating the page number
      const queryParams: TQueryParams[] = [
         { name: "page", value: page.toString() }, // Update page number
      ];

      setParams(queryParams);
   };

   // Define the columns for the table
   const columns = [
      {
         title: "Order ID",
         dataIndex: "_id",
         key: "id",
         render: (text: string) => <b>{text}</b>,
      },
      {
         title: "Customer",
         dataIndex: "user",
         key: "user",
         render: (user: any) => (
            <div>
               <p>
                  <b>{user?.name}</b>
               </p>
               <p>{user?.email}</p>
            </div>
         ),
      },
      {
         title: "Transaction ID",
         dataIndex: "transaction",
         key: "transaction",
         render: (transaction) => transaction?.id || "N/A",
      },
      {
         title: "Payment Method",
         dataIndex: "transaction",
         key: "paymentMethod",
         render: (transaction) => transaction?.method || "N/A",
      },
      {
         title: "Amount",
         dataIndex: "totalPrice",
         key: "totalPrice",
         render: (price: number) => `$${price}`,
      },
      {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status: string) => (
            <Tag color={status === "Paid" ? "green" : "red"}>
               {status.toUpperCase()}
            </Tag>
         ),
      },
      {
         title: "Products",
         dataIndex: "products",
         key: "products",
         render: (products) => (
            <ul>
               {products.map((item) => (
                  <li key={item.product._id}>
                     {item.product.title} (x{item.quantity})
                  </li>
               ))}
            </ul>
         ),
      },
      {
         title: "Order Date",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (date) => new Date(date).toLocaleString(),
      },
   ];

   return (
      <div>
         <h2 className="text-2xl text-center mb-4">All Orders</h2>
         <div className="min-h-[70vh]">
            <Table
               dataSource={data?.data?.data || []}
               columns={columns}
               rowKey="_id"
               loading={isLoading}
               scroll={{ x: 800 }} // Ensures responsiveness on small screens
               bordered
               pagination={false}
            />
         </div>
         {/* Pagination */}
         <div className=" flex justify-center">
            <Pagination
               current={currentPage}
               total={data?.data?.meta?.totalCount}
               pageSize={4}
               onChange={handlePageChange}
               showSizeChanger={false}
               hideOnSinglePage={true}
            />
         </div>
      </div>
   );
};

export default ViewAllOrders;
