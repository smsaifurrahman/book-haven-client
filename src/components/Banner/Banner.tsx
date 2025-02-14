/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const bannerData = [
   {
      image: "https://i.ibb.co/MyHgfBHh/open-book-grass.jpg",
      title: "Discover Your Next Adventure",
      description: "Explore a world of stories, knowledge, and inspiration.",
   },
   {
      image: "https://i.ibb.co/5CSSbhn/download.jpg",
      title: "Bestsellers & New Arrivals",
      description:
         "Find the latest books and timeless classics in our collection.",
   },
   {
      image: "https://i.ibb.co/PzstdYCp/What-Makes-A-Book-Banner.jpg",
      title: "Exclusive Discounts for Book Lovers",
      description: "Get up to 50% off on selected books and bundles.",
   },
];

const BookHavenCarousel = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
   };

   return (
      <div className="relative w-full mx-auto overflow-hidden rounded-xl">
         <Slider {...settings}>
            {bannerData.map((item, index) => (
               <div key={index} className="relative  ">
                  <div className="relative w-full h-[380px] md:h-[450px] rounded-xl overflow-hidden">
                     {/* Image with rounded corners */}
                     <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                     />

                     {/* Dark Overlay */}
                     <div className="absolute inset-0 bg-black opacity-50"></div>

                     {/* Text Content */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">
                           {item.title}
                        </h1>
                        <p className="text-sm md:text-lg max-w-2xl">
                           {item.description}
                        </p>
                        <button className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-md md:text-lg rounded-md transition duration-300">
                           Shop Now
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   );
};

const PrevArrow = (props: any) => {
   const { onClick } = props;
   return (
      <button
         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 p-3 rounded-full text-white z-10 hover:bg-opacity-80 transition"
         onClick={onClick}
      >
         <LeftOutlined className="text-xl" />
      </button>
   );
};

const NextArrow = (props: any) => {
   const { onClick } = props;
   return (
      <button
         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 p-3 rounded-full text-white z-10 hover:bg-opacity-80 transition"
         onClick={onClick}
      >
         <RightOutlined className="text-xl" />
      </button>
   );
};

export default BookHavenCarousel;
