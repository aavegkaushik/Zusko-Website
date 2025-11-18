import React from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "How Zusko is Redefining Urban Laundry Experience",
    author: "Aaveg Kaushik",
    date: "October 20, 2025",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba2?auto=format&fit=crop&w=900&q=60",
    description:
      "At Zusko, we are transforming laundry into a seamless digital experience. Discover how technology and sustainability come together to save your time and energy.",
  },
  {
    id: 2,
    title: "5 Reasons Why On-Demand Laundry Is the Future",
    author: "Shubh Diwakar",
    date: "October 10, 2025",
    image: "https://images.unsplash.com/photo-1600170311834-9b0f9d9b2c76?auto=format&fit=crop&w=900&q=60",
    description:
      "Convenience and speed define modern life — and on-demand laundry fits perfectly into it. Here’s why doorstep laundry services are here to stay.",
  },
  {
    id: 3,
    title: "Sustainability in Laundry: Zusko’s Eco-Friendly Approach",
    author: "Team Zusko",
    date: "September 25, 2025",
    image: "https://images.unsplash.com/photo-1618080464428-7b4f3f1e7e2c?auto=format&fit=crop&w=900&q=60",
    description:
      "From eco-friendly detergents to water-efficient machines, Zusko is committed to making clean clothes sustainable. Learn more about our green initiative.",
  },
];

const Blog = () => {
  return (
    <div className="bg-white mt-20 min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-16 bg-linear-to-b from-yellow-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Zusko Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, stories, and updates from the world of on-demand laundry and urban convenience.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-2xl shadow-md hover:shadow-xl bg-white border border-gray-100 transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 hover:text-yellow-500 cursor-pointer">
                {blog.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FaUser /> {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> {blog.date}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {blog.description}
              </p>
              <button className="mt-3 text-yellow-500 font-semibold hover:text-yellow-600 transition">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
