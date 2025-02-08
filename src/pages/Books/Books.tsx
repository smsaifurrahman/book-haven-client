/** @format */
import { useState } from "react";
import { Select, Input, Button, Spin, Switch } from "antd"; // Import Switch for the in-stock filter
import BookCard from "../../components/BookCard/BookCard";
import { useGetAllBooksQuery } from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";
import { useAuthorsList } from "../../utils/authorList";
import { TQueryParams } from "../../types/global";

const { Option } = Select;

// Define category options
const categories = ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"];

const Books = () => {
   const [searchValue, setSearchValue] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
   const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(undefined);
   const [inStock, setInStock] = useState<boolean | undefined>(undefined); // New state for inStock filter
   const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);

   const { data, isFetching } = useGetAllBooksQuery(params);
   const books = data?.data?.data;

   // Get authors from custom hook
   const { authors, isFetching: isAuthorsFetching } = useAuthorsList();

   // Function to handle search and filter
   const handleFilter = () => {
      const queryParams: TQueryParams[] = [];

      if (searchValue.trim() !== "") {
         queryParams.push({ name: "searchTerm", value: searchValue });
      }

      if (selectedCategory) {
         queryParams.push({ name: "category", value: selectedCategory });
      }

      if (selectedAuthor) {
         queryParams.push({ name: "author", value: selectedAuthor });
      }

      if (inStock !== undefined) { // Add filter for inStock
         queryParams.push({ name: "inStock", value: inStock.toString() });
      }

      setParams(queryParams.length > 0 ? queryParams : undefined);
   };

   return (
      <div>
         {/* Search and Filter Section */}
         <div className="mb-4 flex gap-4">
            {/* Search Input */}
            <Input
               placeholder="Search books..."
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onPressEnter={handleFilter}
               className="w-64"
            />

            {/* Category Filter */}
            <Select
               placeholder="Select Category"
               value={selectedCategory}
               onChange={(value) => setSelectedCategory(value)}
               className="w-40"
               allowClear
            >
               {categories.map((category) => (
                  <Option key={category} value={category}>
                     {category}
                  </Option>
               ))}
            </Select>

            {/* Author Filter */}
            <Select
               placeholder="Select Author"
               value={selectedAuthor}
               onChange={(value) => setSelectedAuthor(value)}
               className="w-40"
               allowClear
               loading={isAuthorsFetching}
            >
               {authors.map((author) => (
                  <Option key={author} value={author}>
                     {author}
                  </Option>
               ))}
            </Select>

            {/* InStock Filter */}
            <div className="flex items-center">
               <span>In Stock Only</span>
               <Switch
                  checked={inStock}
                  onChange={(checked) => setInStock(checked)}
                  className="ml-2"
               />
            </div>

            {/* Filter Button */}
            <Button type="primary" onClick={handleFilter}>
               Apply Filters
            </Button>
         </div>

         {/* Books Grid */}
         {isFetching ? (
            <Spin size="large" />
         ) : (
            <div className="grid grid-cols-2 gap-4">
               {books?.map((book: TBook) => (
                  <BookCard key={book._id} book={book} />
               ))}
            </div>
         )}
      </div>
   );
};

export default Books;
