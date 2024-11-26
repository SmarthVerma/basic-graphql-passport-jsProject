/* eslint-disable react/prop-types */
import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGOUT_USER } from "../graphql/mutations";
import { GET_AUTH_USER } from "../graphql/query";

export const Sidebar = () => {
    const navigate = useNavigate();

    // GraphQL Mutation for Logout
    const [logout, { loading, error }] = useMutation(LOGOUT_USER, {
        refetchQueries: [GET_AUTH_USER],
        onCompleted: () => {
            navigate("/login"); // Redirect to login
        },
        onError: (error) => {
            console.error("Logout failed:", error.message);
        },
    });

    const handleLogout = async () => {
        try {
            await logout(); // Trigger the mutation
        } catch (error) {
            console.error("An error occurred during logout:", error.message);
        }
    };

    const handleNavigate = (path) => {
        try {
            navigate(path);
        } catch (error) {
            console.error("Navigation error:", error.message);
        }
    };

    return (
        <div className="hidden md:block w-64 h-screen bg-blue-600 text-white fixed shadow-lg">
            <h2 className="text-2xl font-semibold p-6 border-b border-blue-500">Dashboard</h2>
            <ul className="mt-6 space-y-2 px-10">
                {/* Rooms Navigation */}
                <li
                    className="px-6 select-none hover:w-40 py-3 flex justify-center items-end bg-white text-black hover:text-white font-bold hover:bg-blue-700 rounded-lg cursor-pointer transition"
                    onClick={() => handleNavigate("/dashboard/")}
                >
                    Rooms
                </li>

                {/* Add a room */}
                {/* Uncomment if admin functionality is restored */}
                {/* {isAdmin && (
                    <li
                        className="px-6 select-none hover:w-40 py-3 flex justify-center items-end bg-white text-black hover:text-white font-bold hover:bg-blue-700 rounded-lg cursor-pointer transition"
                        onClick={() => handleNavigate("/dashboard/add-rooms")}
                    >
                        Add a room
                    </li>
                )} */}
            </ul>

            {/* Logout Button */}
            <div className="absolute bottom-4 w-full px-6">
                <button
                    className="w-full select-none py-3 text-center bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer transition"
                    onClick={handleLogout}
                    disabled={loading}
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>
                {/* Show error message if logout fails */}
                {error && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
            </div>
        </div>
    );
};