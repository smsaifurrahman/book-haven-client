import { Button, Table, TableColumnsType } from "antd";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";
import { toast } from "sonner";

export type TTableData = Pick<TBook, "title" | "author" | "price" | "category"> & { key: string };

const ViewAllBooks = () => {
   const [deleteBook] = useDeleteBookMutation(); // Fix: use array destructuring
   const { data, isFetching } = useGetAllBooksQuery(undefined);
   const bookData = data?.data.data;

   const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting book...');
      try {
         await deleteBook(id).unwrap();
          toast.success('Book is Deleted successfully', { id: toastId });
         
    } catch (error) {
          toast.error('Failed to create book', { id: toastId });
      }
   };

   const tableData: TTableData[] = bookData?.map(({ _id, title, author, price, category }) => ({
      key: _id,
      title,
      author,
      price,
      category,
   })) || [];

   const columns: TableColumnsType<TTableData> = [
      {
         title: "Title",
         dataIndex: "title",
         key: "title",
      },
      {
         title: "Author",
         dataIndex: "author",
         key: "author",
      },
      {
         title: "Price",
         dataIndex: "price",
         key: "price",
      },
      {
         title: "Category",
         dataIndex: "category",
         key: "category",
      },
      {
         title: "Action",
         key: "X",
         render: (_, record) => (
            <Button>Update</Button>
         ),
      },
      {
         title: "Action",
         key: "Y",
         render: (_, record) => (
            <Button onClick={() => handleDelete(record.key)} danger>
               Delete
            </Button>
         ),
      },
   ];

   return <Table loading={isFetching} columns={columns} dataSource={tableData} />;
};

export default ViewAllBooks;
