import React from 'react';
import { Table, Button, Spin, Skeleton } from 'antd';
import { useBlockUserMutation, useGetAllUsersQuery } from "../../redux/feature/admin/admin.api";

const ViewAllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);  // Destructure isLoading to check if data is being fetched
  const [blockUser] = useBlockUserMutation();

  const handleBlockUser = (userId) => {
    console.log(userId);
    // Call the block user mutation
    blockUser(userId);
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const isBlocked = record.isBlocked;  // Assuming `isBlocked` is part of your user data
        return (
          <Button 
            onClick={() => handleBlockUser(record._id)} 
            danger 
            disabled={isBlocked}
          >
            {isBlocked ? 'Deactivated' : 'Deactivate'}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <h2>All Users</h2>
      {isLoading ? (
        // Show a loading spinner while data is being fetched
        // <Spin size="large" />
        <Skeleton />
      ) : (
        <Table 
          dataSource={data?.data} // Make sure this matches your data structure
          columns={columns} 
          rowKey="id" // Assuming each user has a unique 'id'
        />
      )}
    </div>
  );
};

export default ViewAllUsers;
