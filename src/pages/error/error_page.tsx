import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 py-12 px-6">
      {/* Error message container */}
      <div className="max-w-md text-center md:text-left space-y-6">
        <h1 className="text-5xl font-bold text-red-600">404: Unable to Locate Page</h1>
        <p className="text-xl text-gray-800">
        We couldn't locate the page you were looking for. Try checking the URL or start over
        </p>
        <button
          type="button"
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
          onClick={() => navigate("/")}
          aria-label="Go to homepage"
        >
          Go Home
        </button>
      </div>

      {/* Image container */}
      <div className="mt-8 md:mt-0 md:ml-8">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
          alt="Illustration of Error 404"
          className="w-full max-w-xs rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
