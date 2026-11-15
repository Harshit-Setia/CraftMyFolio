import Layout from "./Layout";
import Home from "./pages/Home";
import PlaceholderPage from "./backup/PlaceholderPage";
import ErrorPage from "./backup/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import SignUpForm from "./pages/Signup";
import CreateFolio from "./pages/CreateFolio";
import PublicFolioPage from "./pages/PublicFolioPage";


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
        path: "create",
        element: <CreateFolio />,
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/folio/:slug/*",
    element: <PublicFolioPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
