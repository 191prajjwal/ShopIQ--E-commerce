import Image from "next/image"; // Importing Image component for optimized images
import Link from "next/link"; // Importing Link component for navigation

const About = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Go to Home Button */}
      <div className="mb-4">
        <Link href="/" className="text-blue-600 font-semibold text-lg flex items-center hover:text-blue-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          Go to Home
        </Link>
      </div>

      {/* Page Content */}
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">About ShopIQ</h1>

      {/* Image Section */}
      <div className="text-center mb-6">
        <Image
          src="/images/ecom.jpg"
          alt="About ShopIQ"
          width={500}
          height={300}
          className="mx-auto rounded-lg shadow-md"
        />
      </div>

      {/* Description Section */}
      <div className="text-lg text-gray-800 space-y-5">
        <p>
          ShopIQ is a cutting-edge eCommerce platform designed to provide an exceptional shopping experience. We offer a wide range of products across various categories, ensuring our customers can find exactly what they are looking for. With a user-friendly interface and secure checkout process, we make shopping online a breeze.
        </p>

        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
        <p>
          Our vision is to become the go-to destination for online shopping, providing high-quality products at competitive prices. We aim to continuously improve our services and create a seamless shopping experience for our customers.
        </p>

        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li className="text-lg text-gray-700">Wide range of products from trusted brands.</li>
          <li className="text-lg text-gray-700">Secure and easy checkout process.</li>
          <li className="text-lg text-gray-700">Excellent customer service with fast response times.</li>
          <li className="text-lg text-gray-700">Free shipping on eligible orders.</li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-600">Thank you for choosing ShopIQ. Happy shopping!</p>
      </div>
    </div>
  );
};

export default About;
