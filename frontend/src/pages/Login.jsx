import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import { GET_AUTH_USER } from "../graphql/query";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Use mutation with proper options
  const [login, { loading }] = useMutation(LOGIN_USER.mutation, {
    refetchQueries: [GET_AUTH_USER],
    onCompleted: (data) => {
      if (data?.login) {
        setErrorMessage(""); // Clear errors
        navigate("/dashboard"); // Navigate to dashboard
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || "An error occurred during login.");
    },
  });

  const onSubmit = async (formData) => {
    try {
      await login({ variables: formData });
    } catch {
      // Errors are handled in onError
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded-md transition duration-200 focus:outline-none ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register */}
        <div className="mt-6 text-center text-sm">
          <p>
            {"Don't"} have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};