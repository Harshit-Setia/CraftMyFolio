import Layout from "./Layout";
import Home from "./pages/Home";
import PlaceholderPage from "./backup/PlaceholderPage";
import ErrorPage from "./backup/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

// 2. Define the Error Page

// 3. Create the router configuration object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "templates",
        element: <PlaceholderPage title="Templates" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "features",
        element: <PlaceholderPage title="Features" />,
      },
      {
        path: "about",
        element: <PlaceholderPage title="About Us" />,
      },
      {
        path: "contact",
        element: <PlaceholderPage title="Contact" />,
      },
      {
        path: "privacy",
        element: <PlaceholderPage title="Privacy Policy" />,
      },
      {
        path: "terms",
        element: <PlaceholderPage title="Terms of Service" />,
      },
      {
        path: "signin",
        element: <PlaceholderPage title="Sign In" />,
      },
      {
        path: "signup",
        element: <PlaceholderPage title="Sign Up" />,
      },
    ],
  },
]);

// 4. The main App component renders the RouterProvider
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
