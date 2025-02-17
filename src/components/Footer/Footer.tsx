/** @format */

const Footer = () => {
   return (
      <footer className="footer bg-gray-200 text-gray-800 p-6">
         <nav>
            <h6 className="footer-title text-lg font-semibold">Shop</h6>
            <a className="link link-hover">Best Sellers</a>
            <a className="link link-hover">New Arrivals</a>
            <a className="link link-hover">Genres</a>
            <a className="link link-hover">Book Reviews</a>
         </nav>
         <nav>
            <h6 className="footer-title text-lg font-semibold">About</h6>
            <a className="link link-hover">About BookHaven</a>
            <a className="link link-hover">Our Story</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Press</a>
         </nav>
         <nav>
            <h6 className="footer-title text-lg font-semibold">Customer Service</h6>
            <a className="link link-hover">Contact Us</a>
            <a className="link link-hover">Shipping & Returns</a>
            <a className="link link-hover">Order Status</a>
            <a className="link link-hover">FAQ</a>
         </nav>
         <form>
            <h6 className="footer-title text-lg font-semibold">Newsletter</h6>
            <fieldset className="form-control w-80">
               <label className="label">
                  <span className="label-text">Get updates on new books and offers</span>
               </label>
               <div className="join">
                  <input
                     type="text"
                     placeholder="username@bookhaven.com"
                     className="input input-bordered join-item"
                  />
                  <button className="btn bg-indigo-600 text-white join-item">
                     Subscribe
                  </button>
               </div>
            </fieldset>
         </form>
         <div className="footer-bottom mt-6">
            <p>&copy; 2025 BookHaven. All rights reserved.</p>
         </div>
      </footer>
   );
};

export default Footer;
