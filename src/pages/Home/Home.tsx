import Banner from "../../components/Banner/Banner";
import FeaturedBooks from "../../components/FeaturedBooks/FeaturedBooks";
import Testimonial from "../../components/Testimonial/Testimonial";


const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedBooks></FeaturedBooks>
            <Testimonial />
        </div>
    );
};

export default Home;