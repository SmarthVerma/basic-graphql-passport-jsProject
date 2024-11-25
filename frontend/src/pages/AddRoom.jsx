import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Zod schema for validation
const roomSchema = z.object({
    roomNumber: z.string().min(1, "Room number is required"),
    status: z.string().min(1, "Room status is required"),
    location: z.string().min(1, "Room location is required"),
    available: z.boolean().default(true), // Default to true
});

export const AddRoom = () => {
    // const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // Set up react-hook-form with Zod  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(roomSchema),
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // const newRoom = {
            //     roomNumber: data.roomNumber,
            //     status: data.status,
            //     location: data.location,
            //     available: data.available,
            // };

            console.log({ data })



            // navigate("/dashboard");
        } catch (error) {
            setErrorMessage("Error creating the room. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create a New Room</h2>

                {errorMessage && (
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Room Number */}
                    <div className="mb-4">
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-600">
                            Room Number
                        </label>
                        <input
                            type="text"
                            id="roomNumber"
                            {...register("roomNumber")}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                            placeholder="Enter room number"
                        />
                        {errors.roomNumber && <p className="text-red-500 text-xs mt-1">{errors.roomNumber.message}</p>}
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-600">
                            Room Status
                        </label>
                        <input
                            type="text"
                            id="status"
                            {...register("status")}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                            placeholder="Enter room status"
                        />
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                            Room Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            {...register("location")}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                            placeholder="Enter room location"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Room Availability</label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="available"
                                {...register("available")}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-600">Available</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none"
                    >
                        Create Room
                    </button>
                </form>

                {/* Link to Dashboard */}
                <div className="mt-6 text-center text-sm">
                    <p>
                        Go back to{" "}
                        <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
                            Dashboard
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};