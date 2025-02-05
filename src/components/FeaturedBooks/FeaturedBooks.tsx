import { useGetAllBooksQuery } from "../../redux/feature/book.api";


const FeaturedBooks = () => {

    const {data} = useGetAllBooksQuery(undefined);
console.log(data);
    return (
        <div>
            FeaturedBooks
        </div>
    );
};


export default FeaturedBooks;