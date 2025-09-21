import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-indigo-600">Oops!</h1>
      <p className="mt-4 text-xl text-gray-700">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mt-2 text-base text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="/"
        className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
