import { FaBuilding, FaHandsHelping, FaLeaf, FaUsers } from "react-icons/fa";
// import corporateImg from "../assets/corporate.jpg"; // replace with your real image
import image from '../assets/forBusiness.png'
const ForBusiness = () => {
  return (
    <div className="bg-white mt-20 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-64 px-6 md:px-20 py-16 overflow-hidden">
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-black">
            Corporate Laundry Solutions for a Smarter Business
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Partner with <a href={'/'}><span className="font-semibold text-yellow-500">Zusko</span></a> for seamless, affordable, and eco-friendly laundry services designed for businesses — from hotels and hostels to hospitals and offices.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold px-6 py-3 rounded-tl-2xl rounded-br-2xl">
            Get a Corporate Quote
          </button>
        </div>

        <div className="md:w-5/12 mt-0 md:mt-0">
          <img
            src={image}
            alt="Corporate Laundry"
            className="w-11/12 h-auto rounded-3xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 md:px-20 py-20 text-center md:text-left max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
          Why <strong>Businesses</strong> Choose Zusko
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          Zusko brings efficiency, hygiene, and trust to your workplace. Whether
          it’s uniforms, linens, or bulk cleaning needs — we handle it all with
          advanced technology, sustainable methods, and doorstep service.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition">
            <FaBuilding className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Trusted by Institutions
            </h3>
            <p className="text-gray-600">
              Our reliable service caters to hotels, restaurants, and corporates
              with guaranteed quality and timeliness.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition">
            <FaHandsHelping className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Custom Plans
            </h3>
            <p className="text-gray-600">
              Flexible packages built around your business volume, frequency, and
              budget — pay only for what you need.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition">
            <FaLeaf className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Eco-Friendly Process
            </h3>
            <p className="text-gray-600">
              We use sustainable detergents and advanced machines to ensure your
              brand stays clean — inside and out.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition">
            <FaUsers className="text-yellow-400 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Dedicated Support
            </h3>
            <p className="text-gray-600">
              Our corporate clients get a dedicated relationship manager for
              smooth communication and on-time deliveries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Partner With Zusko Today
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-8">
          Join India’s growing network of businesses that trust Zusko for
          professional laundry care. Simplify your operations, reduce costs,
          and leave a lasting impression with spotless uniforms and linens.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-tl-2xl rounded-br-2xl transition">
          Contact Corporate Team
        </button>
      </section>
    </div>
  );
};

export default ForBusiness;
