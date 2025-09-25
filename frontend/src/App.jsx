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
import First from "./folioTemplate/First";

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
    path: "folio/create",
    element: <CreateFolio />,
  }
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
    errorElement: <ErrorPage />, // It's good practice for each top-level route to have an error element
  },
  {
    path: "signup",
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path:"/foliotemplate/First",
    element:<First
  name="Harshit Setia"
  bio="Full-stack developer passionate about React and Node.js."
  avatar="https://via.placeholder.com/150"
  resume="https://example.com/resume.pdf"
  social={[{ platform: "GitHub", url: "https://github.com/username" }]}
  education={[{ level: "B.Tech", institution: "ABC University", yearOfCompletion: 2025, degree: "Computer Science", fieldOfStudy: "CS", score: "8.5 CGPA" }]}
  skills={["JavaScript", "React", "Node.js"]}
  projects={[{ title: "Portfolio", description: "Personal site", github: "https://github.com/username/portfolio" }]}
  experience={[{ title: "Intern", company: "XYZ Corp", from: "2024-01-01", to: "2024-06-01", description: "Worked on APIs" }]}
  testimonials={[{ name: "Jane Doe", role: "Manager", feedback: "Great work!" }]}
/>,
    errorElement:<ErrorPage />
  }
  
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
