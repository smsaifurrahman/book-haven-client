
import { Table, Tag } from 'antd';
import { useGetAllOrdersQuery } from "../../redux/feature/order/order";

const ViewAllOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);

  // Define the columns for the table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: 'id',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Customer',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <div>
          <p><b>{user?.name}</b></p>
          <p>{user?.email}</p>
        </div>
      ),
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transaction',
      key: 'transaction',
      render: (transaction) => transaction?.id || 'N/A',
    },
    {
      title: 'Payment Method',
      dataIndex: 'transaction',
      key: 'paymentMethod',
      render: (transaction) => transaction?.method || 'N/A',
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Paid' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
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
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>All Orders</h2>
      <Table 
        dataSource={data?.data || []} 
        columns={columns} 
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: 800 }} // Ensures responsiveness on small screens
        bordered
      />
    </div>
  );
};

export default ViewAllOrders;
