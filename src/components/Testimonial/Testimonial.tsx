import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        name: "John Doe",
        role: "CEO, TechCorp",
        quote: "This service was amazing! Everything was handled professionally, and I couldn't be happier with the results.",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: "Jane Smith",
        role: "Marketing Manager, BrightSolutions",
        quote: "I highly recommend them! The experience was smooth, and the quality exceeded my expectations.",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        name: "Michael Johnson",
        role: "Founder, StartupX",
        quote: "Fantastic team to work with. Their expertise helped us scale our business faster than expected!",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        name: "Emily Davis",
        role: "Product Manager, Innovate Inc.",
        quote: "The level of professionalism and creativity exceeded our expectations. Would love to work with them again!",
        image: "https://randomuser.me/api/portraits/women/4.jpg"
    }
];

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // lg screens
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, // md screens
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // sm screens (mobile)
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">
                    What Our Clients Say
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    See what our happy customers have to say about us!
                </p>
            </div>

            <div className="mt-10">
                <Slider {...settings} className="px-2"> {/* Adding padding to create gap */}
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-2"> {/* Adds gap between slides */}
                            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                                <p className="text-gray-700">"{testimonial.quote}"</p>
                                <div className="mt-4 flex justify-center items-center space-x-4">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                    />
                                    <div>
                                        <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonial;
