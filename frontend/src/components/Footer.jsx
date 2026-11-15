import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Footer = () => {
  const { token } = useAuth();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <Link to="/" className="text-lg font-bold text-indigo-700">
            CraftFolio
          </Link>
          <p className="mt-1 text-sm text-gray-500">Build and share your portfolio in minutes.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-6 text-sm text-gray-600">
          <Link to="/#templates" className="transition-colors hover:text-indigo-600">
            Templates
          </Link>
          {token ? (
            <Link to="/dashboard" className="transition-colors hover:text-indigo-600">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/signin" className="transition-colors hover:text-indigo-600">
                Sign in
              </Link>
              <Link to="/signup" className="transition-colors hover:text-indigo-600">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
      <p className="border-t border-gray-100 py-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CraftFolio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
