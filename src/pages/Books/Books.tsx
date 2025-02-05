import BookCard from "../../components/BookCard/BookCard";
import { useGetAllBooksQuery } from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";


const Books = () => {
  const { data, isFetching } = useGetAllBooksQuery(undefined);
  const books = data?.data.data;
  console.log(books);
    return (
        <div>
           <div className="grid grid-cols-2 gap-4">
             {
                books?.map((book: TBook) => <BookCard key={book._id}  book={book}></BookCard> )
             }
           </div>
        </div>
    );
};

export default Books;