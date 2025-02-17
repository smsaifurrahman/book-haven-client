/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { useGetMyOrdersQuery } from "../../redux/feature/order/order";
import { useGetSingleUserQuery } from "../../redux/feature/user/user.api";


const ViewMyOrders = () => {
  const { data } = useGetSingleUserQuery(undefined);
  const user_id = data?.data?._id;

  const { data: orderData, isLoading } = useGetMyOrdersQuery(user_id);

  console.log('orderData',orderData);
  // Function to return colored Tag for status
  const getStatusTag = (status: string) => {
    let color = "default";
    switch (status) {
      case "Paid":
        color = "green";
        break;
      case "Pending":
        color = "yellow";
        break;
      case "Cancelled":
        color = "red";
        break;
      case "Shipped":
        color = "blue";
        break;
      case "Completed":
        color = "purple";
        break;
      default:
        color = "default";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  // Define table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"], // Hide on small screens
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price}`, // Format price
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status), // Use colored Tag
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Paid", value: "Paid" },
        { text: "Shipped", value: "Shipped" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value: string, record: any) => record.status === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(), // Format date
      responsive: ["md"], // Hide on small screens
    },
  ];

  // Process the data for the table
  const tableData = orderData?.data?.map((order: any) =>
    order.products.map((item: any) => ({
      key: item._id,
      _id: order._id,
      productName: item.product?.title || "Unknown", // Ensure product has title
      quantity: item.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }))
  ).flat(); // Flatten the array since products are nested

  return (
    <div style={{ padding: "10px" }}>
      <h2 className="font-bold text-xl" style={{ textAlign: "center", marginBottom: "15px" }}>My Orders</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        bordered
        pagination={false}
        scroll={{ x: "max-content" }} // Enable horizontal scroll on small screens
      />
    </div>
  );
};

export default ViewMyOrders;
