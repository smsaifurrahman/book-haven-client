const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                        Welcome to Book Haven
                    </h1>
                    <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
                        Where Stories Come Alive and Readers Find Their Tribe
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Our Literary Journey
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Founded in 2012 by a group of bibliophiles, Book Haven has evolved from a small 
                            neighborhood bookstore to a thriving literary hub. We're proud to have curated 
                            over 50,000 unique titles and hosted 500+ author events.
                        </p>
                        <div className="bg-indigo-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-indigo-900 mb-3">
                                Why Choose Us?
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                    </svg>
                                    Hand-picked selections by expert curators
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                    </svg>
                                    Eco-friendly packaging & sustainable practices
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                    </svg>
                                    Personalized recommendation engine
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <img 
                            src="https://i.ibb.co/jkH4bvHc/john-michael-thomson-9m1-V6-A8-Fm-A-unsplash.jpg" 
                            alt="Bookstore interior"
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 opacity-30"/>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Meet Our Curators
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {name: 'Sarah Mitchell', role: 'Chief Curator', bio: '15+ years in literary curation', img: 'https://i.ibb.co/cXtBkhvR/drew-hays-ag-GIKYs4m-Ys-unsplash.jpg'},
                            {name: 'James Cooper', role: 'Community Manager', bio: 'Creator of 20+ book clubs', img: 'https://i.ibb.co/N2rrCXHC/matthew-hamilton-t-NCH0s-KSZb-A-unsplash.jpg'},
                            {name: 'Emma Davis', role: 'Events Director', bio: 'Hosted 100+ author events', img: 'https://i.ibb.co/rGSQG9sQ/sai-de-silva-4-g-FGb12h-FA-unsplash.jpg'},
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <img 
                                    src={member.img} 
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="p-4">
                        <div className="text-4xl font-bold text-indigo-900 mb-2">10K+</div>
                        <div className="text-gray-600">Books Catalogued</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-indigo-900 mb-2">95%</div>
                        <div className="text-gray-600">Customer Satisfaction</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-indigo-900 mb-2">500+</div>
                        <div className="text-gray-600">Literary Events</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-indigo-900 mb-2">24/7</div>
                        <div className="text-gray-600">Support Team</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-900 text-white py-16 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Join Our Reading Revolution</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Discover your next great read and become part of our global community
                    </p>
                    <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                        Explore Our Collection
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;