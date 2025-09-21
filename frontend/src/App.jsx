import Layout from "./Layout";
import Home from "./pages/Home";
import PlaceholderPage from "./backup/PlaceholderPage";
import ErrorPage from "./backup/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
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
    ],
  },
   {
    path: "signin",
    element:<SignIn/>,
    errorElement: <ErrorPage />, // It's good practice for each top-level route to have an error element
  },
  {
    path: "signup",
    element: <PlaceholderPage title="Sign Up" />,
    errorElement: <ErrorPage />,
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
