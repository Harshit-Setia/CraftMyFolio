import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
// --- SVG Icons ---
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
    />
  </svg>
);

const PasswordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

// Eye Open Icon
const EyeOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
         0 8.268 2.943 9.542 7-1.274 4.057-5.064 
         7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

// Eye Closed Icon (with slash)
const EyeClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3l18 18M10.477 10.477A3 3 0 0012 15c.795 
         0 1.517-.31 2.047-.813m-3.57-3.57A3 3 0 
         0115 12m4.243-4.243A9.973 9.973 0 
         0121.542 12C20.268 16.057 16.478 19 
         12 19a9.958 9.958 0 01-4.243-.757M6.343 
         6.343A9.958 9.958 0 002.458 12c1.274 
         4.057 5.064 7 9.542 7 1.61 0 3.13-.38 
         4.457-1.05"
    />
  </svg>
);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (!Object.keys(newErrors).length === 0) {
      // console.log("Form submitted:", { email, password });
      // Here you would typically make an API call to authenticate the user
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // console.log(res);
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const response = await res.json();
      console.log(response);
      login(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission Failed:", error);
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/dashboard" />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-6">
          <div className="text-center">
            <Link to="/" className="text-3xl font-bold text-indigo-700">
              CraftFolio
            </Link>
            <p className="text-gray-500 mt-2">
              Welcome back! Sign in to your account.
            </p>
          </div>

          <div className="mt-8 w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white py-8 px-10 rounded-xl shadow-md border border-gray-100"
            >
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<EmailIcon />}
              />

              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<PasswordIcon />}
                rightAccessory={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
              />

              <div className="text-right mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot your password?
                </Link>
              </div>

              <FormButton>Sign In</FormButton>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex space-x-4">
              <button className="w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <img
                  src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button className="w-1/2 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <img
                  src="https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
