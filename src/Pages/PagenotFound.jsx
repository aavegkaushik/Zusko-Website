import ErrorImg from '../assets/Error-Image.png'
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      {/* Image */}
      <img
        src={ErrorImg} // replace this with your own image path
        alt="Page Not Found"
        className="w-80 h-auto md:w-96 mb-6 object-contain"
      />

      {/* Text */}
      <h1 className="text-2xl md:text-3xl mb-4 font-semibold text-gray-800">
        Page Not Found
      </h1>
        <Link to={"/"} className="bg-yellow-400 text-black px-3 py-2 rounded-tl-2xl rounded-br-2xl hover:bg-gray-200 transition">
        <span className="text-md p-2 font-medium">Go Home</span>
        </Link>
    </div>
  );
};

export default PageNotFound;
