/** @format */

import {
   Button,
   Table,
   TableColumnsType,
   Modal,
   Form,
   Input,
   InputNumber,
   Select,
   Upload,
   Typography,
} from "antd";
import {
   useDeleteBookMutation,
   useGetAllBooksQuery,
   useUpdateBookMutation,
} from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";
import { toast } from "sonner";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { handleImageUpload } from "../../UploadImageToBB";

export type TTableData = Pick<
   TBook,
   "title" | "author" | "price" | "category"
> & { key: string };

const ViewAllBooks = () => {
   const [deleteBook] = useDeleteBookMutation();
   const [updateBook] = useUpdateBookMutation();
   const { data, isFetching } = useGetAllBooksQuery(undefined);
   const bookData = data?.data.data;
   const [image, setImage] = useState<File | null>(null);
   const [form] = Form.useForm();

   // State for modal visibility and the current book being updated
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [currentBook, setCurrentBook] = useState<TBook | null>(null);

   const handleUpdateClick = (record: TBook) => {
      form.resetFields(); // Reset the form
      setCurrentBook(record);
      console.log(record);
      setIsModalVisible(true);

      // ✅ Use `setTimeout` to ensure the latest record is applied
      setTimeout(() => {
         form.setFieldsValue(record); // Set form fields correctly
      }, 0);
   };

   const handleDelete = async (id: string) => {
      const toastId = toast.loading("Deleting book...");
      try {
         await deleteBook(id).unwrap();
         toast.success("Book is Deleted successfully", { id: toastId });
      } catch (error) {
         toast.error("Failed to delete book", { id: toastId });
      }
   };

   const handleUpdate = async ( data : TBook, id:string) => {
      const toastId = toast.loading("Updating book...");

      try {
         let uploadedImageUrl = data?.imageUrl; // Default to existing image

         // If a new image is provided, upload it
         if (image) {
            uploadedImageUrl = (await handleImageUpload(image)) as string;
         }

         console.log( 'data',data);
      
         
         const updatedBookData = {
            ...data,
            // Only update the fields user changed
            imageUrl: uploadedImageUrl, // Ensure image is updated properly
         };

       
         const updatedInfo = {
            updatedBookData, id
         }
         console.log(updatedInfo);
         const res = await updateBook(updatedInfo).unwrap();
         console.log(res);
         toast.success("Book updated successfully", { id: toastId });
         setIsModalVisible(false); // Close modal after update
      } catch (error) {
         toast.error("Failed to update book", { id: toastId });
         console.log(error);
      }
   };

   const tableData: TTableData[] =
      bookData?.map(
         ({
            _id,
            title,
            inStock,
            author,
            price,
            category,
            description,
            quantity,
            imageUrl,
         }) => ({
            key: _id,
            title,
            author,
            price,
            category,
            description,
            imageUrl,
            quantity,
            inStock,
         })
      ) || [];

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
            <Button onClick={() => handleUpdateClick(record)}>Update</Button>
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

   return (
      <>
         <Table loading={isFetching} columns={columns} dataSource={tableData} />

         {/* Modal for Update */}
         <Modal
            title="Update Book"
            open={isModalVisible}
            onCancel={() => {
               setIsModalVisible(false);
               form.resetFields();
            }}
            footer={null}
         >
            {currentBook && (
               <Form
                  form={form}
                  onFinish= {(values) => handleUpdate( values, currentBook?.key )}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
               >
                  {/* Title Field */}
                  <Form.Item
                     label="Title"
                     name="title"
                     rules={[
                        { required: true, message: "Please input the title!" },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  {/* Author Field */}
                  <Form.Item
                     label="Author"
                     name="author"
                     rules={[
                        { required: true, message: "Please input the author!" },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  {/* Price Field */}
                  <Form.Item
                     label="Price"
                     name="price"
                  
                     rules={[
                        { required: true, message: "Please input the price!" },
                     ]}
                  >
                     <InputNumber type="number" min={0} />
                  </Form.Item>

                  {/* Category Field */}
                  <Form.Item
                     label="Category"
                     name="category"
                     rules={[
                        {
                           required: true,
                           message: "Please input the category!",
                        },
                     ]}
                  >
                     <Select>
                        <Select.Option value="Fiction">Fiction</Select.Option>
                        <Select.Option value="Science">Science</Select.Option>
                        <Select.Option value="SelfDevelopment">
                           Self Development
                        </Select.Option>
                        <Select.Option value="Poetry">Poetry</Select.Option>
                        <Select.Option value="Religious">
                           Religious
                        </Select.Option>
                     </Select>
                  </Form.Item>

                  {/* Description Field */}
                  <Form.Item
                     label="Description"
                     name="description"
                     rules={[
                        {
                           required: true,
                           message: "Please input the description!",
                        },
                     ]}
                  >
                     <Input.TextArea />
                  </Form.Item>

                  {/* Quantity Field */}
                  <Form.Item
                     label="Quantity"
                     name="quantity"
                     rules={[
                        {
                           required: true,
                           message: "Please input the quantity!",
                        },
                        {
                           type: "number",
                           min: 0,
                           message: "Quantity must be a positive number",
                        },
                     ]}
                  >
                     <InputNumber type="number" min={0} />
                  </Form.Item>

                  {/* In Stock Field */}
                  <Form.Item
                     label="In Stock"
                     name="inStock"
                     rules={[
                        {
                           required: true,
                           message: "Please select stock status!",
                        },
                     ]}
                  >
                     <Select>
                        <Select.Option value={true}>Yes</Select.Option>
                        <Select.Option value={false}>No</Select.Option>
                     </Select>
                  </Form.Item>

                  {/* Image Upload Field */}
                  <Form.Item label="Upload Image" name="imageUrl">
                     <Upload
                        beforeUpload={(file) => {
                           setImage(file);
                           return false; // Prevent auto upload
                        }}
                        maxCount={1}
                        showUploadList={false}
                     >
                     
                        <Button icon={<UploadOutlined />}>
                           Click to Upload
                        </Button>
                        {image && <Typography.Text>{image.name}</Typography.Text>}
                     </Upload>
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                     <Button  type="primary" htmlType="submit">
                        Update
                     </Button>
                  </Form.Item>
               </Form>
            )}
         </Modal>
      </>
   );
};

export default ViewAllBooks;
