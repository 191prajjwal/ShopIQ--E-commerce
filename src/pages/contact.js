import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for form submission
  const [isSending, setIsSending] = useState(false); // State for handling form submission in progress

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true); // Set sending state to true
    setTimeout(() => {
      // Simulating the form submission
      console.log("Form submitted:", formData);
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form data after submission
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      {/* Message Sent Confirmation */}
      {isSubmitted && !isSending && (
        <div className="max-w-md mx-auto bg-green-100 p-6 mb-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-lg font-semibold">Message Sent Successfully!</p>
          </div>
        </div>
      )}

      {/* Contact Form */}
      {!isSubmitted && (
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-6 py-3 text-white rounded-lg ${
                isSending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contact;
