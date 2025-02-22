/** @format */
import { useState, useEffect } from "react";
import { Select, Input, Button, Pagination, Skeleton } from "antd";
import BookCard from "../../components/BookCard/BookCard";
import { useGetAllBooksQuery } from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";
import { useAuthorsList } from "../../utils/authorList";
import { TQueryParams } from "../../types/global";

const { Option } = Select;

const categories = [
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
];

const priceRanges = [
  { label: "0 - 100", value: "0-100" },
  { label: "100 - 200", value: "100-200" },
  { label: "200 - 300", value: "200-300" },
  { label: "300 and above", value: "300-above" },
];

const Books = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(
    undefined
  );
  const [stockStatus, setStockStatus] = useState<string | undefined>(undefined); // Changed state variable name
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    string | undefined
  >(undefined);
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isFetching } = useGetAllBooksQuery(params);
  const books = data?.data?.data;
  const totalCount = data?.meta?.totalCount;

  const { authors, isFetching: isAuthorsFetching } = useAuthorsList();

  let queryParams: TQueryParams[];

  const handleFilter = () => {
    queryParams = [];

    if (searchValue.trim() !== "") {
      queryParams.push({ name: "searchTerm", value: searchValue });
    }

    if (selectedCategory) {
      queryParams.push({ name: "category", value: selectedCategory });
    }

    if (selectedAuthor) {
      queryParams.push({ name: "author", value: selectedAuthor });
    }

    if (stockStatus !== undefined) {
      queryParams.push({ name: "inStock", value: stockStatus });
    }

    if (selectedPriceRange) {
      queryParams.push({ name: "priceRange", value: selectedPriceRange });
    }

    queryParams.push({ name: "page", value: "1" });
    setCurrentPage(1);
    setParams(queryParams.length > 0 ? queryParams : undefined);
  };

  useEffect(() => {
    if (data?.meta?.totalCount) {
      setTotalPages(Math.ceil(data.meta.totalCount / 4));
    }
  }, [data, data?.meta?.totalCount]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const updatedParams: TQueryParams[] = [
      ...(params?.filter((param) => param.name !== "page") || []),
      { name: "page", value: page.toString() },
    ];

    setParams(updatedParams);
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="mb-4 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-0">
        <div>
          <Input
            placeholder="Search books..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleFilter}
            className="w-full md:w-44"
          />
        </div>
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          className="w-full md:w-40"
          allowClear
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Select Author"
          value={selectedAuthor}
          onChange={(value) => setSelectedAuthor(value)}
          className="w-full md:w-40"
          allowClear
          loading={isAuthorsFetching}
        >
          {authors.map((author) => (
            <Option key={author} value={author}>
              {author}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Select Price Range"
          value={selectedPriceRange}
          onChange={(value) => setSelectedPriceRange(value)}
          className="w-full md:w-40"
          allowClear
        >
          {priceRanges.map((range) => (
            <Option key={range.value} value={range.value}>
              {range.label}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Select Stock Status" // Updated placeholder
          value={stockStatus}
          onChange={(value) => setStockStatus(value)}
          className="w-full md:w-40" // Adjusted width
          allowClear
        >
          <Option value="true">In Stock</Option>
          <Option value="false">Out of Stock</Option>
        </Select>
        <Button  className="bg-indigo-500 font-semibold text-white" onClick={handleFilter}>
          Apply Filters
        </Button>
      </div>

      {/* Books Grid */}
      {isFetching ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books?.map((book: TBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="my-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={6}
          onChange={handlePageChange}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default Books;
