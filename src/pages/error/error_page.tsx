import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-md text-center md:text-left space-y-6">
        <p className="text-5xl font-bold text-red-100">Error 404</p>
        <p className="text-xl text-gray-600">
          The page you are looking for doesn't exist.
        </p>
        <button
          type="button"
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:ml-8">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
          alt="Error 404"
          className="w-full max-w-xs rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
