import { Table, Button, Skeleton, Tag } from 'antd'; // Import Tag for role display
import { useBlockUserMutation, useGetAllUsersQuery } from "../../redux/feature/admin/admin.api";

const ViewAllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();

  const handleBlockUser = (userId) => {
    console.log(userId);
    blockUser(userId);
  };

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
      render: (role) => (
        <Tag color={role === 'admin' ? 'geekblue' : 'green'}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const isBlocked = record.isBlocked;
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
        <Skeleton />
      ) : (
        <Table 
          dataSource={data?.data} 
          columns={columns} 
          rowKey="_id" // Ensure to use the correct key based on your data structure
        />
      )}
    </div>
  );
};

export default ViewAllUsers;
