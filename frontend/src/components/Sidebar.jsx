import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="hidden md:block w-64 h-screen bg-blue-600 text-white fixed shadow-lg">
            <h2 className="text-2xl font-semibold p-6 border-b border-blue-500">Dashboard</h2>
            <ul className="mt-6 space-y-2 px-10">
                <li className="px-6 hover:w-40 py-3 flex justify-center items-end bg-white text-black hover:text-white font-bold hover:bg-blue-700 rounded-lg cursor-pointer transition">
                    Rooms
                </li>
                <li
                    className="px-6 hover:w-40 py-3 flex justify-center items-end bg-white text-black hover:text-white font-bold hover:bg-blue-700 rounded-lg cursor-pointer transition"
                    onClick={() => handleNavigate('/dashboard/add-room')}
                >
                    Add a room
                </li>
            </ul>
            <div className="absolute bottom-4 w-full px-6">
                <button
                    className="w-full py-3 text-center bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer transition"
                    onClick={() => handleNavigate('/login')} // Add a route for logout if needed
                >
                    Logout
                </button>
            </div>
        </div>
    );
};